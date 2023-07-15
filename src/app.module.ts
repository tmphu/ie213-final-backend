import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { LocationModule } from './location/location.module';
import { HouseModule } from './house/house.module';
import { HostModule } from './host/host.module';
import { AmenityModule } from './amenity/amenity.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    HostModule,
    LocationModule,
    HouseModule,
    AmenityModule,
    BookingModule,
    // BinhluanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
