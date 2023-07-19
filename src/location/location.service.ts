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
  UpdateLocationBody,
} from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all locations
  async getLocations(pageSize = 10, currentPage = 1): Promise<any> {
    try {
      const response = await this.prisma.location.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (!response) {
        throw new NotFoundException('location not found');
      }
      const data = mapToLocationFlatDto(...response);
      const totalCount = response.length;
      return { data, totalCount };
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

  // Get location by id
  async getLocationById(locationId: number): Promise<LocationDto> {
    try {
      const response = await this.prisma.location.findUnique({
        where: {
          id: locationId,
        },
      });
      if (!response) {
        throw new NotFoundException('location not found');
      }
      return mapToLocationFlatDto(response)[0];
    } catch (err) {
      throw err;
    }
  }

  // Update location
  async updateLocation(
    locationId: number,
    payload: UpdateLocationBody,
  ): Promise<any> {
    const location = await this.prisma.location.findUnique({
      where: {
        id: locationId,
      },
    });
    if (!location) {
      throw new NotFoundException('error fetching location');
    }
    try {
      const response = await this.prisma.location.update({
        where: {
          id: locationId,
        },
        data: {
          location: payload.location ? payload.location : location.location,
          city: payload.city ? payload.city : location.city,
          image: payload.image ? payload.image : location.image,
        },
      });
      return response;
    } catch (err) {
      throw new InternalServerErrorException('error when updating location');
    }
  }

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
