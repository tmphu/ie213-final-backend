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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Param, Put, Query } from '@nestjs/common/decorators';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';
import {
  CreateAmenityBody,
  GetAmenityDto,
  UpdateAmenityBody,
} from './dto/amenity.dto';

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

  // Get amenity by id
  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: String })
  async getHouseById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.amenityService.getAmenityById(intId);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Update amenity
  @Put('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateAmenity(
    @Res() res: Response,
    @Body() body: UpdateAmenityBody,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.amenityService.updateAmenity(intId, body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
