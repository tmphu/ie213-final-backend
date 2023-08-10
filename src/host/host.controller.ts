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
import { HostService } from './host.service';
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
import { SearchHostDto, CreateHostDto } from './dto/host.dto';

@ApiTags('Host')
@Controller('v1/host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  // Get all hosts
  @Get('/')
  async getHosts(@Res() res: Response): Promise<Response> {
    try {
      const data = await this.hostService.getHosts();
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Search hosts by name
  @Get('/search')
  async searchHostsByName(
    @Res() res: Response,
    @Body() body: SearchHostDto,
  ): Promise<Response> {
    try {
      const { name } = body;
      const data = await this.hostService.searchHostsByName(name);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Get host by id
  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getHost(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const data = await this.hostService.getHost(id);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  // Create host
  @Post('/')
  async createHost(
    @Res() res: Response,
    @Body() body: CreateHostDto,
  ): Promise<Response> {
    try {
      const data = await this.hostService.createHost(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
