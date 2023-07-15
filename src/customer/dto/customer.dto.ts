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

class CreateCustomerSwaggerDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({ example: 'mypassword', description: 'password', type: String })
  password: string;

  @ApiProperty({
    example: 'john',
    description: 'first name',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    example: 'appleseed',
    description: 'last name',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    example: '0912345678',
    description: 'phone number',
    type: String,
  })
  phone_number: string;

  @ApiProperty({
    example: 'male',
    description: 'gender',
    type: String,
  })
  gender: string;
}

class SearchCustomerSwaggerDto {
  @ApiProperty({
    example: 'john',
    description: 'name',
    type: String,
  })
  name: string;
}

class GetCustomersDto {
  @ApiProperty({
    example: '10',
    description: 'pageSize',
    type: String,
  })
  pageSize: string;

  @ApiProperty({
    example: '1',
    description: 'currentPage',
    type: String,
  })
  currentPage: string;
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

export {
  CustomerDto,
  mapToCustomerFlatDto,
  SearchCustomerSwaggerDto,
  CreateCustomerSwaggerDto,
  GetCustomersDto,
};
