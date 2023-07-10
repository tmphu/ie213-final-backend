import { ApiProperty } from '@nestjs/swagger/dist';

interface HostDto {
  host_id: number;
  profile_photo: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
}

class CreateHostDto {
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

class SearchHostDto {
  @ApiProperty({
    example: 'john',
    description: 'name',
    type: String,
  })
  name: string;
}

function mapToHostFlatDto(...args: any[]): HostDto[] {
  return args.map((host) => ({
    host_id: host.id,
    first_name: host.user?.first_name,
    last_name: host.user?.last_name,
    email: host.user?.email,
    phone_number: host.user?.phone_number,
    gender: host.user?.gender,
    profile_photo: host.profile_photo,
  }));
}

export { HostDto, mapToHostFlatDto, SearchHostDto, CreateHostDto };
