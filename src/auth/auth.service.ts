import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { UserSignupDto, mapToUserLoginResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

const CUSTOMER = 'CUSTOMER';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService, private jwt: JwtService) {}
  private prisma = new PrismaClient();

  secretKey = this.config.get('SECRET_KEY') || 'DUMMY';
  expiryDuration = this.config.get('EXPIRY_DURATION') || '30d';

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        customer: true,
        host: true,
      },
    });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = this.jwt.sign(
          { data: { email: email, password: password } },
          { secret: this.secretKey, expiresIn: this.expiryDuration },
        );
        return mapToUserLoginResponseDto(user, token);
      }
    }
    throw new UnauthorizedException('Incorrect username or password');
  }

  async signup(payload: UserSignupDto): Promise<any> {
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
          role: CUSTOMER,
          customer: {
            create: {},
          },
        },
        include: {
          customer: true,
        },
      });
      return createUserResponse;
    } catch (err) {
      throw new InternalServerErrorException('error when creating user');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwt.verify(token, {
        secret: this.secretKey,
      });
      return true;
    } catch (err) {
      throw new InternalServerErrorException('error validating token');
    }
  }
}
