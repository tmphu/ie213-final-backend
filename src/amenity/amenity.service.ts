import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { CreateAmenityBody } from './dto/amenity.dto';

@Injectable()
export class AmenityService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all amenities
  async getAmenities(pageSize = 10, currentPage = 1): Promise<any[]> {
    try {
      const response = await this.prisma.amenity.findMany({
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (!response) {
        throw new NotFoundException('amenity not found');
      }
      return response;
    } catch (err) {
      throw err;
    }
  }

  // Create amenity
  async createAmenity(payload: CreateAmenityBody): Promise<any> {
    const amenity = await this.prisma.amenity.findFirst({
      where: {
        code: payload.code,
      },
    });
    if (amenity) {
      throw new ConflictException('code is already existed!');
    }
    try {
      const createAmenityResponse = await this.prisma.amenity.create({
        data: {
          code: payload.code,
          name: payload.name,
        },
      });
      return createAmenityResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating amenity');
    }
  }
}
