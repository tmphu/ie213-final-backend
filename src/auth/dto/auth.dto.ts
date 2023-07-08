import { ApiProperty } from '@nestjs/swagger/dist';

class UserLoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({ example: 'mypassword', description: 'password', type: String })
  password: string;
}

class UserSignupDto {
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

export { UserLoginDto, UserSignupDto };
