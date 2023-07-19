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
import {
  SearchCustomerSwaggerDto,
  CreateCustomerSwaggerDto,
  GetCustomersDto,
  UpdateCustomerSwaggerDto,
} from './dto/customer.dto';

@ApiTags('Customer')
@Controller('v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Get all customers
  @Get('/')
  async getCustomers(
    @Query() query: GetCustomersDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.customerService.getCustomers(
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Search customers by name
  @Get('/search')
  async searchCustomersByName(
    @Res() res: Response,
    @Body() body: SearchCustomerSwaggerDto,
  ): Promise<Response> {
    try {
      const { name } = body;
      const data = await this.customerService.searchCustomersByName(name);
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

  // Create customer by admin
  @Post('/')
  async createCustomer(
    @Res() res: Response,
    @Body() body: CreateCustomerSwaggerDto,
  ): Promise<Response> {
    try {
      const data = await this.customerService.createCustomer(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Update customer
  @Put('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateLocation(
    @Res() res: Response,
    @Body() body: UpdateCustomerSwaggerDto,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.customerService.updateCustomer(intId, body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

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
