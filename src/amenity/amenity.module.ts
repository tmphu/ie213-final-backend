import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AmenityController],
  providers: [AmenityService, AuthService],
})
export class AmenityModule {}
