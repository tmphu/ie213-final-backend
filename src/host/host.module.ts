import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { HostController } from './host.controller';
import { HostService } from './host.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HostController],
  providers: [HostService, AuthService],
})
export class HostModule {}
