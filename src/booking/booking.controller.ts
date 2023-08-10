import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Headers,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  BookingRequestDto,
  CreatePaymentTransactionDto,
  GetBookingDto,
} from './dto/booking.dto';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@ApiTags('Booking')
@Controller('v1/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Get all houses per host
  @Get('/host/:hostId')
  @ApiParam({ name: 'hostId', required: true, type: Number })
  async getHouses(
    @Param('hostId') hostId: string,
    @Query() query: GetBookingDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intHostId = parseInt(hostId);
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.bookingService.getBookings(
        intHostId,
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create booking
  @Post('/')
  async createBooking(
    @Res() res: Response,
    @Body() body: BookingRequestDto,
    @Headers('token') token: string,
  ): Promise<Response> {
    try {
      const data = await this.bookingService.createBooking(token, body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get booking by user id
  @Get('/')
  async getBookedHouseByUserId(
    @Query() query: GetBookingDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage, userId } = query;
      const intUserId = parseInt(userId);
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.bookingService.getBookedHouseByUserId(
        intUserId,
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get booking by id
  @Get('/details/:id')
  @ApiParam({ name: 'id', required: true, type: String })
  async getBookingById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.bookingService.getBookingById(intId);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get booking by code
  @Get('/details/code/:code')
  @ApiParam({ name: 'code', required: true, type: String })
  async getBookingByCode(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.bookingService.getBookingByCode(code);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create payment transaction for booking
  @Post('/payment')
  async createPaymentTransaction(
    @Body() body: CreatePaymentTransactionDto,
    @Res() res: Response,
    @Headers('token') token: string,
  ): Promise<Response> {
    try {
      const data = await this.bookingService.createPaymentTransaction(
        token,
        body,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
