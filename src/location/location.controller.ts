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
import {
  GetLocationDto,
  CreateLocationBody,
  UpdateLocationBody,
} from './dto/location.dto';
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

  // Get location by id
  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getLocationById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.locationService.getLocationById(intId);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  // Update location
  @Put('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateLocation(
    @Res() res: Response,
    @Body() body: UpdateLocationBody,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.locationService.updateLocation(intId, body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
