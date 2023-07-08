import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
// import { BinhluanModule } from './binhluan/binhluan.module';
// import { VitriModule } from './vitri/vitri.module';
// import { PhongModule } from './phong/phong.module';
// import { DatphongModule } from './datphong/datphong.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    // BinhluanModule,
    // VitriModule,
    // PhongModule,
    // DatphongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
