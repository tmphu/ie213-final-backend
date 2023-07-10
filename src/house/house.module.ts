import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HouseController],
  providers: [HouseService, AuthService],
})
export class HouseModule {}
