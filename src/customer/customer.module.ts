import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CustomerController],
  providers: [CustomerService, AuthService],
})
export class CustomerModule {}
