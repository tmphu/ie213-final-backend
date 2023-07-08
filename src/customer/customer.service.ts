import {
  HttpStatus,
  Injectable,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import {
  CustomerDto,
  CustomerSwaggerDto,
  mapToCustomerFlatDto,
} from './dto/customer.dto';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all customers
  async getCustomers(): Promise<CustomerDto[]> {
    try {
      const getCustomersResponse = await this.prisma.customer.findMany({
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
      });
      if (getCustomersResponse.length === 0) {
        throw new NotFoundException('customer not found');
      }
      return mapToCustomerFlatDto(...getCustomersResponse);
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

  // // Search nguoi dung theo ten
  // async searchNguoiDungByName(name: string): Promise<NguoiDungDto[]> {
  //   const data = await this.prisma.nguoi_dung.findMany({
  //     where: {
  //       name: {
  //         contains: name.toLowerCase(),
  //       },
  //     },
  //   });
  //   return data;
  // }

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
