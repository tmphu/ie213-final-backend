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
          id: true,
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
          id: true,
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
          id: id,
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
            id: true,
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
      throw new InternalServerErrorException('error when creating user');
    }
  }

  // // Tao moi nguoi dung
  // async createNguoiDung(
  //   token: string,
  //   nguoiDung: NguoiDungSwaggerDto,
  // ): Promise<NguoiDungDto> {
  //   const isValidToken = await this.authService.validateToken(token);
  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const user = await this.prisma.nguoi_dung.findUnique({
  //     where: {
  //       email: nguoiDung.email,
  //     },
  //   });
  //   if (user) {
  //     throw new Error('Email da ton tai trong he thong');
  //   }

  //   const data = await this.prisma.nguoi_dung.create({
  //     data: nguoiDung,
  //   });
  //   return data;
  // }

  // // Cap nhat nguoi dung
  // async updateNguoiDung(
  //   token: string,
  //   idParam: string,
  //   nguoiDung: NguoiDungSwaggerDto,
  // ): Promise<NguoiDungDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.nguoi_dung.update({
  //     where: {
  //       id: id,
  //     },
  //     data: nguoiDung,
  //   });
  //   return data;
  // }

  // // Xoa nguoi dung
  // async deleteNguoiDung(token: string, idParam: string): Promise<NguoiDungDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.nguoi_dung.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }
}
