import { ApiProperty } from '@nestjs/swagger/dist';
import { Location } from '@prisma/client';

class LocationDto {
  id: number;
  location: string;
  city: string;
  image: string;
}

class CreateLocationBody {
  @ApiProperty({
    example: 'Phú Quốc',
    description: 'location',
    type: String,
  })
  location: string;

  @ApiProperty({
    example: 'Kiên Giang',
    description: 'city',
    type: String,
  })
  city: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'image',
    type: String,
  })
  image: string;
}

class GetLocationDto {
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

function mapToLocationFlatDto(...args: Location[]): LocationDto[] {
  return args.map((loc) => ({
    id: loc.id,
    location: loc.location,
    city: loc.city,
    image: loc.image,
  }));
}

export {
  CreateLocationBody,
  mapToLocationFlatDto,
  GetLocationDto,
  LocationDto,
};
