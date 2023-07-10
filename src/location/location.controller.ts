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
import { LocationService } from './location.service';
import { Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetLocationDto, CreateLocationBody } from './dto/location.dto';
import {
  Delete,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
// import { FileUploadDto } from 'src/fileupload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@ApiTags('Location')
@Controller('v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // Get all locations
  @Get('/')
  async getLocations(
    @Query() query: GetLocationDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.locationService.getLocations(
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create location
  @Post('/')
  async createLocation(
    @Body() body: CreateLocationBody,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.locationService.createLocation(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}

//   // Lay vi tri theo id
//   @Get('/:id')
//   @ApiParam({ name: 'id', required: true, type: Number })
//   async getViTriById(
//     @Res() res: Response,
//     @Param('id') id: string,
//   ): Promise<Response> {
//     try {
//       const data = await this.viTriService.getViTriById(id);
//       return res.status(200).json({
//         message: 'Success',
//         statusCode: 200,
//         content: data,
//         dateTime: new Date(),
//       });
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.FORBIDDEN);
//     }
//   }

//   // Cap nhat vi tri
//   @Put('/:id')
//   @ApiParam({ name: 'id', required: true, type: Number })
//   async updateViTri(
//     @Res() res: Response,
//     @Body() body: ViTriSwaggerDto,
//     @Param('id') id: string,
//     @Headers('userToken') token: string,
//   ): Promise<Response> {
//     try {
//       const data = await this.viTriService.updateViTri(token, id, body);
//       return res.status(200).json({
//         message: 'Success',
//         statusCode: 200,
//         content: data,
//         dateTime: new Date(),
//       });
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.FORBIDDEN);
//     }
//   }

//   // Xoa vi tri
//   @Delete('/:id')
//   @ApiParam({ name: 'id', required: true, type: Number })
//   async deleteViTri(
//     @Res() res: Response,
//     @Param('id') id: string,
//     @Headers('userToken') token: string,
//   ): Promise<Response> {
//     try {
//       const data = await this.viTriService.deleteViTri(token, id);
//       return res.status(200).json({
//         message: 'Vi tri da duoc xoa thanh cong',
//         statusCode: 200,
//         content: data,
//         dateTime: new Date(),
//       });
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.FORBIDDEN);
//     }
//   }

//   // Upload hinh anh vi tri
//   @Post('/upload-hinh-vitri')
//   @ApiQuery({ name: 'id', required: true, type: Number })
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: process.cwd() + '/public/img',
//         filename: (req, file, cb) =>
//           cb(null, Date.now() + '_' + file.originalname),
//       }),
//     }),
//   )
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     description: 'Upload image',
//     type: FileUploadDto,
//   })
//   async uploadHinhAnhViTri(
//     @Res() res: Response,
//     @Query('id') id: string,
//     @Headers('userToken') token: string,
//     @UploadedFile() file: Express.Multer.File,
//   ): Promise<Response> {
//     try {
//       const viTri = await this.viTriService.getViTriById(id);
//       if (!viTri) {
//         throw new HttpException('Vi tri khong tim thay', HttpStatus.NOT_FOUND);
//       }

//       // Save the URL of the uploaded image to the 'hinh_anh' field of the 'vi_tri' record
//       const imagePath = `/img/${file.filename}`;
//       viTri.hinh_anh = imagePath;
//       await this.viTriService.updateViTri(token, id, viTri);

//       return res.status(200).json({
//         message: 'Success',
//         statusCode: 200,
//         content: viTri,
//         dateTime: new Date(),
//       });
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.FORBIDDEN);
//     }
//   }
// }
