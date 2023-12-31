import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [BookingController],
  providers: [BookingService, AuthService],
})
export class BookingModule {}
