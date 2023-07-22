import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { CreateHouseBody, UpdateHouseBody } from './dto/house.dto';

@Injectable()
export class HouseService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all houses per host
  async getHouses(
    hostId: number,
    pageSize = 10,
    currentPage = 1,
  ): Promise<any> {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: {
          id: hostId,
        },
      });
      let response;
      if (userInfo.role === 'ADMIN') {
        response = await this.prisma.house.findMany({
          include: {
            HouseImage: true,
            amenity: true,
            location: true,
          },
          skip: pageSize * (currentPage - 1),
          take: pageSize,
        });
      } else if (userInfo.role === 'HOST') {
        response = await this.prisma.house.findMany({
          where: {
            host_id: hostId,
          },
          include: {
            HouseImage: true,
            amenity: true,
            location: true,
          },
          skip: pageSize * (currentPage - 1),
          take: pageSize,
        });
      }
      if (!response) {
        throw new NotFoundException('house not found');
      }
      const totalCount = response.length;
      return { data: response, totalCount };
    } catch (err) {
      throw err;
    }
  }

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

  // Get house by id
  async getHouseById(id: number): Promise<any> {
    try {
      const response = await this.prisma.house.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
          HouseImage: true,
          amenity: true,
          Review: true,
        },
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.host_id,
      },
    });
    if (!user) {
      throw new NotFoundException('not found user');
    }
    const location = await this.prisma.location.findUnique({
      where: {
        id: payload.location_id,
      },
    });
    if (!location) {
      throw new NotFoundException('not found location_id');
    }
    const amenityList = payload.amenities.map((e) => {
      return { id: e };
    });
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
          amenity: {
            connect: amenityList,
          },
        },
        include: {
          HouseImage: true,
          amenity: true,
        },
      });
      return createHouseResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating house');
    }
  }

  // Update house
  async updateHouse(houseId: number, payload: UpdateHouseBody): Promise<any> {
    try {
      const house = await this.prisma.house.findUnique({
        where: {
          id: houseId,
        },
        include: {
          user: {
            include: {
              host: true,
            },
          },
          HouseImage: true,
          amenity: true,
        },
      });
      if (!house) {
        throw new NotFoundException('error fetching house');
      }
      const amenityIds = house.amenity?.map(({ id }) => ({ id: id }));
      const newAmenityIds = payload.amenities?.map((id) => ({ id: id }));
      const response = await this.prisma.house.update({
        where: {
          id: houseId,
        },
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
          host_id: payload.host_id,
          location_id: payload.location_id,
        },
      });
      if (house.HouseImage.length > 0) {
        await this.prisma.houseImage.update({
          where: {
            id: house.HouseImage[0].id,
          },
          data: {
            image: payload.image,
            uploaded_by: payload.host_id,
          },
        });
      } else {
        await this.prisma.houseImage.create({
          data: {
            image: payload.image,
            user: {
              connect: {
                id: payload.host_id,
              },
            },
            house: {
              connect: {
                id: houseId,
              },
            },
          },
        });
      }
      // update amenity
      await this.prisma.$transaction([
        // step 1: remove existing amenities
        this.prisma.house.update({
          where: {
            id: houseId,
          },
          data: {
            amenity: {
              disconnect: amenityIds,
            },
          },
        }),
        // step 2: update amenity
        this.prisma.house.update({
          where: {
            id: houseId,
          },
          data: {
            amenity: {
              connect: newAmenityIds,
            },
          },
        }),
      ]);
      return response;
    } catch (err) {
      throw new InternalServerErrorException('error when updating house');
    }
  }
}
