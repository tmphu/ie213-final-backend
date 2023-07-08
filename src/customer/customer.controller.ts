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
import { CustomerService } from './customer.service';
import { Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Delete,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileUploadDto } from 'src/shared/dto/fileupload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@ApiTags('Customer')
@Controller('v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Get all customers
  @Get('/')
  async getCustomers(@Res() res: Response): Promise<Response> {
    try {
      const data = await this.customerService.getCustomers();
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get customer by id
  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getCustomer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const data = await this.customerService.getCustomer(id);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // // Tao moi nguoi dung
  // @Post('/')
  // async createNguoiDung(
  //   @Res() res: Response,
  //   @Body() body: NguoiDungSwaggerDto,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.nguoiDungService.createNguoiDung(token, body);
  //     return res.status(201).json({
  //       message: 'Success',
  //       statusCode: 201,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Search nguoi dung theo ten
  // @Get('/search/:tenNguoiDung')
  // @ApiParam({ name: 'tenNguoiDung', required: true, type: String })
  // async searchNguoiDungByName(
  //   @Res() res: Response,
  //   @Param('tenNguoiDung') name: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.nguoiDungService.searchNguoiDungByName(name);
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

  // // Cap nhat nguoi dung
  // @Put('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async updateNguoiDung(
  //   @Res() res: Response,
  //   @Body() body: NguoiDungSwaggerDto,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.nguoiDungService.updateNguoiDung(token, id, body);
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

  // // Xoa nguoi dung
  // @Delete('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async deleteNguoiDung(
  //   @Res() res: Response,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.nguoiDungService.deleteNguoiDung(token, id);
  //     return res.status(200).json({
  //       message: 'Nguoi dung da duoc xoa thanh cong',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Upload hinh anh nguoi dung
  // @Post('/upload-avatar')
  // @ApiQuery({ name: 'id', required: true, type: Number })
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: process.cwd() + '/public/img',
  //       filename: (req, file, cb) =>
  //         cb(null, Date.now() + '_' + file.originalname),
  //     }),
  //   }),
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'Upload image',
  //   type: FileUploadDto,
  // })
  // async uploadHinhAnhNguoiDung(
  //   @Res() res: Response,
  //   @Query('id') id: string,
  //   @Headers('userToken') token: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<Response> {
  //   try {
  //     const nguoiDung = await this.nguoiDungService.getNguoiDungById(id);
  //     if (!nguoiDung) {
  //       throw new HttpException(
  //         'Nguoi dung khong tim thay',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     // Save the URL of the uploaded image to the 'hinh_anh' field of the 'nguoi_dung' record
  //     const imagePath = `/img/${file.filename}`;
  //     nguoiDung.hinh_anh = imagePath;
  //     await this.nguoiDungService.updateNguoiDung(token, id, nguoiDung);

  //     return res.status(200).json({
  //       message: 'Success',
  //       statusCode: 200,
  //       content: nguoiDung,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }
}
