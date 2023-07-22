import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import {
  BookingRequestDto,
  CreatePaymentTransactionDto,
} from './dto/booking.dto';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all bookings per host
  async getBookings(
    hostId: number,
    pageSize = 10,
    currentPage = 1,
  ): Promise<any> {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: {
          id: hostId,
        },
      });
      let response;
      if (userInfo.role === 'ADMIN') {
        response = await this.prisma.booking.findMany({
          include: {
            house: true,
            user: true,
            PaymentTransaction: true,
          },
          orderBy: {
            check_in_date: 'asc',
          },
          skip: pageSize * (currentPage - 1),
          take: pageSize,
        });
      } else if (userInfo.role === 'HOST') {
        response = await this.prisma.booking.findMany({
          where: {
            house: {
              host_id: hostId,
            },
          },
          orderBy: {
            check_in_date: 'asc',
          },
          include: {
            house: true,
            user: true,
            PaymentTransaction: true,
          },
          skip: pageSize * (currentPage - 1),
          take: pageSize,
        });
      }
      if (!response) {
        throw new NotFoundException('booking not found');
      }
      const totalCount = response.length;
      return { data: response, totalCount };
    } catch (err) {
      throw err;
    }
  }

  // Get booking by id
  async getBookingById(id: number): Promise<any> {
    try {
      const response = await this.prisma.booking.findUnique({
        where: {
          id: id,
        },
        include: {
          house: true,
          user: true,
          PaymentTransaction: true,
        },
      });
      if (!response) {
        throw new NotFoundException('booking not found');
      }
      return response;
    } catch (err) {
      throw err;
    }
  }

  // Create booking
  async createBooking(token: string, payload: BookingRequestDto): Promise<any> {
    try {
      // const isValidToken = await this.authService.validateToken(token);
      // if (!isValidToken) {
      //   throw new UnauthorizedException('Token is not valid');
      // }

      const bookedHouse = await this.prisma.house.findUnique({
        where: {
          id: payload.house_id,
        },
      });
      if (!bookedHouse) {
        throw new NotFoundException('Error fetching house');
      }

      const bookingCustomer = await this.prisma.customer.findUnique({
        where: {
          user_id: payload.user_id,
        },
      });
      if (!bookingCustomer) {
        throw new NotFoundException('Error fetching customer');
      }
      const checkInDate = dayjs(payload.check_in_date);
      const checkOutDate = dayjs(payload.check_out_date);
      const totalPrice =
        bookedHouse.price * Math.abs(checkOutDate.diff(checkInDate, 'day'));
      const response = await this.prisma.booking.create({
        data: {
          booking_date: new Date(),
          user_id: payload.user_id,
          code:
            'UIT-' +
            uuidv4().replace(/-/g, '').slice(0, 6).toString().toUpperCase(),
          house_id: payload.house_id,
          check_in_date: payload.check_in_date,
          check_out_date: payload.check_out_date,
          guest_number: payload.guest_number,
          price_per_day: bookedHouse.price,
          total_price: totalPrice,
          payment_method: payload.payment_method,
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

  // Create payment transaction for booking
  async createPaymentTransaction(
    token: string,
    payload: CreatePaymentTransactionDto,
  ): Promise<any> {
    try {
      // const isValidToken = await this.authService.validateToken(token);
      // if (!isValidToken) {
      //   throw new UnauthorizedException('Token is not valid');
      // }

      const booking = await this.prisma.booking.findUnique({
        where: {
          id: payload.booking_id,
        },
      });
      if (!booking) {
        throw new NotFoundException('Error fetching booking');
      }

      const existingPayment = await this.prisma.paymentTransaction.findFirst({
        where: {
          booking_id: payload.booking_id,
          is_success: true,
        },
      });
      if (existingPayment) {
        return null;
      }

      const paymentAmount = parseInt(payload.amount) / 100;
      const response = await this.prisma.paymentTransaction.create({
        data: {
          ref: payload.ref,
          amount: paymentAmount,
          payment_date: dayjs(payload.payment_date, 'YYYYMMDDHHmmss').toDate(),
          is_success: payload.is_success,
          payment_gateway: payload.payment_gateway,
          transaction_no: payload.transaction_no,
          booking: {
            connect: { id: payload.booking_id },
          },
        },
      });

      return response;
    } catch (err) {
      throw err;
    }
  }
}
