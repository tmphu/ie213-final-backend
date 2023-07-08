import { ApiProperty } from '@nestjs/swagger/dist';

interface CustomerDto {
  customer_id: number;
  profile_photo: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
}

class CustomerSwaggerDto {
  @ApiProperty({
    example: 'john appleseed',
    description: 'name',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    type: String,
  })
  password: string;

  @ApiProperty({
    example: '0945600864',
    description: 'phone_number',
    type: String,
  })
  phone_number: string;

  @ApiProperty({
    example: 'male',
    description: 'gender',
    type: String,
  })
  gender: string;

  @ApiProperty({
    example: 'CUSTOMER',
    description: 'role',
    type: String,
  })
  role: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'profile_photo',
    type: String,
  })
  profile_photo: string;
}

function mapToCustomerFlatDto(...args: any[]): CustomerDto[] {
  return args.map((customer) => ({
    customer_id: customer.id,
    first_name: customer.user?.first_name,
    last_name: customer.user?.last_name,
    email: customer.user?.email,
    phone_number: customer.user?.phone_number,
    gender: customer.user?.gender,
    profile_photo: customer.profile_photo,
  }));
}

export { CustomerDto, CustomerSwaggerDto, mapToCustomerFlatDto };
