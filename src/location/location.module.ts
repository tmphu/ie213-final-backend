import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [LocationController],
  providers: [LocationService, AuthService],
})
export class LocationModule {}
