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
import { BookingRequestDto, GetBookingDto } from './dto/booking.dto';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@ApiTags('Booking')
@Controller('v1/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

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

  // // Lay toan bo danh sach dat phong
  // @Get('/')
  // async getDatPhong(@Res() res: Response): Promise<Response> {
  //   try {
  //     const data = await this.datPhongService.getDatPhong();

  //     return res.status(200).json({
  //       message: 'Success',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Lay dat phong theo id
  // @Get('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async getDatPhongById(
  //   @Res() res: Response,
  //   @Param('id') id: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.datPhongService.getDatPhongById(id);
  //     return res.status(200).json({
  //       message: 'Success',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Cap nhat dat phong
  // @Put('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async updateDatPhong(
  //   @Res() res: Response,
  //   @Body() body: DatPhongSwaggerDto,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.datPhongService.updateDatPhong(token, id, body);
  //     return res.status(200).json({
  //       message: 'Success',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Xoa dat phong
  // @Delete('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async deleteDatPhong(
  //   @Res() res: Response,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.datPhongService.deleteDatPhong(token, id);
  //     return res.status(200).json({
  //       message: 'Dat phong da duoc xoa thanh cong',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }
}
