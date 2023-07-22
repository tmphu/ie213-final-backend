import {
  HttpStatus,
  Injectable,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import {
  CustomerDto,
  mapToCustomerFlatDto,
  CreateCustomerSwaggerDto,
  UpdateCustomerSwaggerDto,
} from './dto/customer.dto';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';
import * as bcrypt from 'bcrypt';

const CUSTOMER = 'CUSTOMER';

@Injectable()
export class CustomerService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all customers
  async getCustomers(pageSize = 10, currentPage = 1): Promise<any> {
    try {
      const response = await this.prisma.customer.findMany({
        select: {
          user_id: true,
          profile_photo: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              gender: true,
            },
          },
        },
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (response.length === 0) {
        throw new NotFoundException('customer not found');
      }
      const data = mapToCustomerFlatDto(...response);
      const totalCount = response.length;
      return { data, totalCount };
    } catch (err) {
      throw err;
    }
  }

  // Get customer by id
  async getCustomer(idStr: string): Promise<CustomerDto> {
    try {
      const id = parseInt(idStr);
      const getCustomerResponse = await this.prisma.customer.findUnique({
        select: {
          user_id: true,
          profile_photo: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              gender: true,
            },
          },
        },
        where: {
          user_id: id,
        },
      });
      if (!getCustomerResponse) {
        throw new NotFoundException('customer not found');
      }
      return mapToCustomerFlatDto(getCustomerResponse)[0];
    } catch (err) {
      throw err;
    }
  }

  // Search customers by name
  async searchCustomersByName(name: string): Promise<CustomerDto[]> {
    try {
      const searchCustomersByNameResponse = await this.prisma.customer.findMany(
        {
          select: {
            user_id: true,
            profile_photo: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone_number: true,
                gender: true,
              },
            },
          },
          where: {
            user: {
              OR: [
                { first_name: { contains: name.toLowerCase() } },
                { last_name: { contains: name.toLowerCase() } },
              ],
            },
          },
        },
      );
      if (!searchCustomersByNameResponse) {
        throw new NotFoundException('customer not found');
      }
      return mapToCustomerFlatDto(...searchCustomersByNameResponse);
    } catch (err) {
      throw err;
    }
  }

  // Create customer
  async createCustomer(payload: CreateCustomerSwaggerDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      throw new ConflictException(
        'This email address has been registered in another account. Please use another one or login using this email',
      );
    }
    try {
      const createUserResponse = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: bcrypt.hashSync(payload.password, 10),
          first_name: payload.firstName,
          last_name: payload.lastName,
          phone_number: payload.phone_number,
          gender: payload.gender,
          role: CUSTOMER,
          customer: {
            create: {},
          },
        },
        include: {
          customer: true,
        },
      });
      return createUserResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating customer');
    }
  }

  // Update customer
  async updateCustomer(
    customerId: number,
    payload: UpdateCustomerSwaggerDto,
  ): Promise<any> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        user_id: customerId,
      },
      include: {
        user: true,
      },
    });
    if (!customer) {
      throw new NotFoundException('error fetching customer');
    }
    try {
      const response = await this.prisma.customer.update({
        where: {
          user_id: customerId,
        },
        data: {
          user: {
            update: {
              first_name: payload.firstName
                ? payload.firstName
                : customer.user.first_name,
              last_name: payload.lastName
                ? payload.lastName
                : customer.user.last_name,
              phone_number: payload.phone_number
                ? payload.phone_number
                : customer.user.phone_number,
              gender: payload.gender ? payload.gender : customer.user.gender,
            },
          },
        },
        include: {
          user: true,
        },
      });
      return response;
    } catch (err) {
      throw new InternalServerErrorException('error when updating customer');
    }
  }
}
