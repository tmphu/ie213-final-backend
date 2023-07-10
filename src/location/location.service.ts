import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import {
  CreateLocationBody,
  mapToLocationFlatDto,
  LocationDto,
} from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all locations
  async getLocations(pageSize = 10, currentPage = 1): Promise<LocationDto[]> {
    try {
      const getLocationsResponse = await this.prisma.location.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (!getLocationsResponse) {
        throw new NotFoundException('location not found');
      }
      return mapToLocationFlatDto(...getLocationsResponse);
    } catch (err) {
      throw err;
    }
  }

  // Create location
  async createLocation(payload: CreateLocationBody): Promise<any> {
    try {
      const createLocationResponse = await this.prisma.location.create({
        data: payload,
      });
      return createLocationResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating location');
    }
  }

  // // Lay vi tri theo id
  // async getViTriById(idParam: string): Promise<ViTriDto> {
  //   const id = parseInt(idParam);
  //   const data = await this.prisma.vi_tri.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }

  // // Tao moi vi tri
  // async createViTri(token: string, viTri: ViTriSwaggerDto): Promise<ViTriDto> {
  //   const isValidToken = await this.authService.validateToken(token);
  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.vi_tri.create({
  //     data: viTri,
  //   });
  //   return data;
  // }

  // // Cap nhat vi tri
  // async updateViTri(
  //   token: string,
  //   idParam: string,
  //   viTri: ViTriSwaggerDto,
  // ): Promise<ViTriDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.vi_tri.update({
  //     where: {
  //       id: id,
  //     },
  //     data: viTri,
  //   });
  //   return data;
  // }

  // // Xoa vi tri
  // async deleteViTri(token: string, idParam: string): Promise<ViTriDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.vi_tri.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }
}
