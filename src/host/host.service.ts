import {
  HttpStatus,
  Injectable,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { HostDto, mapToHostFlatDto, CreateHostDto } from './dto/host.dto';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';
import * as bcrypt from 'bcrypt';

const HOST = 'HOST';

@Injectable()
export class HostService {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  // Get all hosts
  async getHosts(): Promise<HostDto[]> {
    try {
      const getHostsResponse = await this.prisma.host.findMany({
        select: {
          user_id: true,
          profile_photo: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              gender: true,
            },
          },
        },
      });
      if (getHostsResponse.length === 0) {
        throw new NotFoundException('host not found');
      }
      return mapToHostFlatDto(...getHostsResponse);
    } catch (err) {
      throw err;
    }
  }

  // Get host by id
  async getHost(idStr: string): Promise<HostDto> {
    try {
      const id = parseInt(idStr);
      const getHostResponse = await this.prisma.host.findUnique({
        select: {
          user_id: true,
          profile_photo: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              gender: true,
            },
          },
        },
        where: {
          user_id: id,
        },
      });
      if (!getHostResponse) {
        throw new NotFoundException('host not found');
      }
      return mapToHostFlatDto(getHostResponse)[0];
    } catch (err) {
      throw err;
    }
  }

  // Search hosts by name
  async searchHostsByName(name: string): Promise<HostDto[]> {
    try {
      const searchHostsByNameResponse = await this.prisma.host.findMany({
        select: {
          user_id: true,
          profile_photo: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              gender: true,
            },
          },
        },
        where: {
          user: {
            OR: [
              { first_name: { contains: name.toLowerCase() } },
              { last_name: { contains: name.toLowerCase() } },
            ],
          },
        },
      });
      if (!searchHostsByNameResponse) {
        throw new NotFoundException('host not found');
      }
      return mapToHostFlatDto(...searchHostsByNameResponse);
    } catch (err) {
      throw err;
    }
  }

  // Create host
  async createHost(payload: CreateHostDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      throw new ConflictException(
        'This email address has been registered in another account. Please use another one or login using this email',
      );
    }
    try {
      const createUserResponse = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: bcrypt.hashSync(payload.password, 10),
          first_name: payload.first_name,
          last_name: payload.last_name,
          phone_number: payload.phone_number,
          gender: payload.gender,
          role: HOST,
          host: {
            create: {},
          },
        },
        include: {
          host: true,
        },
      });
      return createUserResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating user');
    }
  }
}
