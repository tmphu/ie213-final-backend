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
import { AmenityService } from './amenity.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Param, Query } from '@nestjs/common/decorators';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';
import { CreateAmenityBody, GetAmenityDto } from './dto/amenity.dto';

@ApiTags('Amenity')
@Controller('v1/amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  // Get all amenities
  @Get('/')
  async getAmenities(
    @Query() query: GetAmenityDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.amenityService.getAmenities(
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create amenity
  @Post('/')
  async createAmenity(
    @Body() body: CreateAmenityBody,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.amenityService.createAmenity(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // // Get all rooms
  // @Get('/')
  // async getPhong(@Res() res: Response): Promise<Response> {
  //   try {
  //     const data = await this.phongService.getPhong();

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

  // // Lay phong theo id
  // @Get('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async getPhongById(
  //   @Res() res: Response,
  //   @Param('id') id: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.phongService.getPhongById(id);
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

  // // Tao moi phong
  // @Post('/')
  // async createPhong(
  //   @Res() res: Response,
  //   @Body() body: PhongSwaggerDto,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.phongService.createPhong(token, body);
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

  // // Lay phong theo vi tri
  // @Get('/lay-phong-theo-vi-tri/')
  // async getPhongByViTriId(
  //   @Res() res: Response,
  //   @Query('viTriId') id: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.phongService.getPhongByViTriId(id);
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

  // // Cap nhat phong
  // @Put('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async updatePhong(
  //   @Res() res: Response,
  //   @Body() body: PhongSwaggerDto,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.phongService.updatePhong(token, id, body);
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

  // // Xoa phong
  // @Delete('/:id')
  // @ApiParam({ name: 'id', required: true, type: Number })
  // async deletePhong(
  //   @Res() res: Response,
  //   @Param('id') id: string,
  //   @Headers('userToken') token: string,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.phongService.deletePhong(token, id);
  //     return res.status(200).json({
  //       message: 'Phong da duoc xoa thanh cong',
  //       statusCode: 200,
  //       content: data,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }

  // // Upload hinh anh phong
  // @Post('/upload-hinh-phong')
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
  // async uploadHinhAnhPhong(
  //   @Res() res: Response,
  //   @Query('id') id: string,
  //   @Headers('userToken') token: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<Response> {
  //   try {
  //     const phong = await this.phongService.getPhongById(id);
  //     if (!phong) {
  //       throw new HttpException('Phong khong tim thay', HttpStatus.NOT_FOUND);
  //     }

  //     // Save the URL of the uploaded image to the 'hinh_anh' field of the 'phong' record
  //     const imagePath = `/img/${file.filename}`;
  //     phong.hinh_anh = imagePath;
  //     await this.phongService.updatePhong(token, id, phong);

  //     return res.status(200).json({
  //       message: 'Success',
  //       statusCode: 200,
  //       content: phong,
  //       dateTime: new Date(),
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //   }
  // }
}
