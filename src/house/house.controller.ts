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
import { HouseService } from './house.service';
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
// import { FileUploadDto } from 'src/fileupload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';
import { CreateHouseBody, GetHouseDto, UpdateHouseBody } from './dto/house.dto';

@ApiTags('House')
@Controller('v1/house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  // Get all houses per host
  @Get('/host/:hostId')
  @ApiParam({ name: 'hostId', required: true, type: Number })
  async getHouses(
    @Param('hostId') hostId: string,
    @Query() query: GetHouseDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intHostId = parseInt(hostId);
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.houseService.getHouses(
        intHostId,
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get houses by location id
  @Get('/location/:locationId')
  @ApiParam({ name: 'locationId', required: true, type: Number })
  async getHousesByLocationId(
    @Param('locationId') locationId: string,
    @Query() query: GetHouseDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { pageSize, currentPage } = query;
      const intLocationId = parseInt(locationId);
      const intPageSize = parseInt(pageSize);
      const intCurrentPage = parseInt(currentPage);
      const data = await this.houseService.getHousesByLocationId(
        intLocationId,
        intPageSize,
        intCurrentPage,
      );
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get house by id
  @Get('/details/:id')
  @ApiParam({ name: 'id', required: true, type: String })
  async getHouseById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const intId = parseInt(id);
      const data = await this.houseService.getHouseById(intId);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create house
  @Post('/')
  async createHouse(
    @Body() body: CreateHouseBody,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.houseService.createHouse(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Update house
  @Put('/:id')
  async updateHouse(
    @Param('id') id: string,
    @Body() body: UpdateHouseBody,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const intHouseId = parseInt(id);
      const data = await this.houseService.updateHouse(intHouseId, body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
