import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { CreateHouseBody } from './dto/house.dto';

@Injectable()
export class HouseService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get houses by location id
  async getHousesByLocationId(
    locationId: number,
    pageSize = 10,
    currentPage = 1,
  ): Promise<any[]> {
    try {
      const response = await this.prisma.house.findMany({
        where: {
          location_id: locationId,
        },
        include: {
          host: true,
          HouseImage: true,
          amenity: true,
        },
        skip: pageSize * (currentPage - 1),
        take: pageSize,
      });
      if (!response) {
        throw new NotFoundException('house not found');
      }
      return response;
    } catch (err) {
      throw err;
    }
  }

  // Create house
  async createHouse(payload: CreateHouseBody): Promise<any> {
    const host = await this.prisma.host.findFirst({
      where: {
        id: payload.host_id,
      },
    });
    if (!host) {
      throw new NotFoundException('not found host_id');
    }
    const location = await this.prisma.location.findFirst({
      where: {
        id: payload.location_id,
      },
    });
    if (!location) {
      throw new NotFoundException('not found location_id');
    }
    try {
      const createHouseResponse = await this.prisma.house.create({
        data: {
          name: payload.name,
          description: payload.description,
          property_type: payload.property_type,
          address: payload.address,
          max_guests: payload.max_guests,
          cancellation_policy: payload.cancellation_policy,
          bedrooms: payload.bedrooms,
          beds: payload.beds,
          bathrooms: payload.bathrooms,
          price: payload.price,
          is_active: true,
          host_id: payload.host_id,
          location_id: payload.location_id,
          HouseImage: {
            create: {
              image: payload.image,
              uploaded_by: payload.host_id,
            },
          },
        },
        include: {
          HouseImage: true,
        },
      });
      return createHouseResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating house');
    }
  }

  // // Tao moi phong
  // async createPhong(token: string, phong: PhongSwaggerDto): Promise<PhongDto> {
  //   const isValidToken = await this.authService.validateToken(token);
  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const isValidViTri = await this.prisma.vi_tri.findUnique({
  //     where: {
  //       id: phong.vi_tri,
  //     },
  //   });
  //   if (!isValidViTri) {
  //     throw new Error('Vi tri khong ton tai');
  //   }

  //   const data = await this.prisma.phong.create({
  //     data: phong,
  //   });
  //   return data;
  // }

  // // Lay toan bo danh sach phong
  // async getPhong(): Promise<PhongDto[]> {
  //   const data = await this.prisma.phong.findMany();
  //   return data;
  // }

  // // Lay phong theo id
  // async getPhongById(idParam: string): Promise<PhongDto> {
  //   const id = parseInt(idParam);
  //   const data = await this.prisma.phong.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }

  // // Cap nhat phong
  // async updatePhong(
  //   token: string,
  //   idParam: string,
  //   phong: PhongSwaggerDto,
  // ): Promise<PhongDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.phong.update({
  //     where: {
  //       id: id,
  //     },
  //     data: phong,
  //   });
  //   return data;
  // }

  // // Xoa phong
  // async deletePhong(token: string, idParam: string): Promise<PhongDto> {
  //   const id = parseInt(idParam);
  //   const isValidToken = await this.authService.validateToken(token);

  //   if (!isValidToken) {
  //     throw new Error('Token is not valid');
  //   }

  //   const data = await this.prisma.phong.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return data;
  // }
}
