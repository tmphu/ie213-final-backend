import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { LocationModule } from './location/location.module';
import { HouseModule } from './house/house.module';
import { HostModule } from './host/host.module';
// import { BinhluanModule } from './binhluan/binhluan.module';
// import { VitriModule } from './vitri/vitri.module';
// import { PhongModule } from './phong/phong.module';
// import { DatphongModule } from './datphong/datphong.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    HostModule,
    LocationModule,
    HouseModule,
    // BinhluanModule,
    // DatphongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
