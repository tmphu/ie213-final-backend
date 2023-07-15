import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { BookingRequestDto } from './dto/booking.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class BookingService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Create booking
  async createBooking(token: string, payload: BookingRequestDto): Promise<any> {
    try {
      const isValidToken = await this.authService.validateToken(token);
      if (!isValidToken) {
        throw new UnauthorizedException('Token is not valid');
      }

      const bookingHouse = await this.prisma.house.findUnique({
        where: {
          id: payload.house_id,
        },
      });
      if (!bookingHouse) {
        throw new NotFoundException('Error fetching house');
      }

      const bookingCustomer = await this.prisma.customer.findUnique({
        where: {
          id: payload.user_id,
        },
      });
      if (!bookingCustomer) {
        throw new NotFoundException('Error fetching customer');
      }
      const checkInDate = dayjs(payload.check_in_date);
      const checkOutDate = dayjs(payload.check_out_date);
      const totalPrice =
        bookingHouse.price * Math.abs(checkOutDate.diff(checkInDate, 'day'));
      const response = await this.prisma.booking.create({
        data: {
          booking_date: new Date(),
          check_in_date: payload.check_in_date,
          check_out_date: payload.check_out_date,
          guest_number: payload.guest_number,
          price_per_day: bookingHouse.price,
          total_price: totalPrice,
          house_id: payload.house_id,
          user_id: payload.user_id,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  // Get booked house by user id
  async getBookedHouseByUserId(
    userId: number,
    pageSize = 10,
    currentPage = 1,
  ): Promise<any[]> {
    try {
      const response = await this.prisma.booking.findMany({
        where: {
          user_id: userId,
        },
        include: {
          house: {
            include: {
              HouseImage: true,
              amenity: true,
            },
          },
        },
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (!response) {
        throw new NotFoundException('booking not found');
      }
      return response;
    } catch (err) {
      throw err;
    }
  }

  // // Lay toan bo danh sach dat phong
  // async getDatPhong(): Promise<DatPhongDto[]> {
  //   const data = await this.prisma.dat_phong.findMany();
  //   return data;
  // }

  // // Lay dat phong theo id
  // async getDatPhongById(idParam: string): Promise<DatPhongDto> {
  //   const id = parseInt(idParam);
  //   const data = await this.prisma.dat_phong.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }

  // // Cap nhat dat phong
  // async updateDatPhong(
  //   token: string,
  //   idParam: string,
  //   datPhong: DatPhongSwaggerDto,
  // ): Promise<DatPhongDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const isValidNguoiDat = await this.prisma.nguoi_dung.findUnique({
  //     where: {
  //       id: datPhong.ma_nguoi_dat,
  //     },
  //   });
  //   if (!isValidNguoiDat) {
  //     throw new Error('ID nguoi dung khong ton tai');
  //   }

  //   datPhong.ngay_den = new Date(datPhong.ngay_den);
  //   datPhong.ngay_di = new Date(datPhong.ngay_di);
  //   const data = await this.prisma.dat_phong.update({
  //     where: {
  //       id: id,
  //     },
  //     data: datPhong,
  //   });
  //   return data;
  // }

  // // Xoa dat phong
  // async deleteDatPhong(token: string, idParam: string): Promise<DatPhongDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.dat_phong.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }
}
