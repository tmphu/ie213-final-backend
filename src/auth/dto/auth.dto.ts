import { ApiProperty } from '@nestjs/swagger/dist';
import { User } from '@prisma/client';

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

class UserLoginResponseDto {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    role: string;
    profile_photo: string;
  };
  token: string;
}

function mapToUserLoginResponseDto(
  user: any,
  token: string,
): UserLoginResponseDto {
  return {
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      role: user.role,
      profile_photo: user?.customer.profile_photo,
    },
    token: token,
  };
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
  first_name: string;

  @ApiProperty({
    example: 'appleseed',
    description: 'last name',
    type: String,
  })
  last_name: string;

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

export { UserLoginDto, UserSignupDto, mapToUserLoginResponseDto };
