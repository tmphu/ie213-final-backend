import { ApiProperty } from '@nestjs/swagger/dist';

interface AmenityList {
  id: number[];
}

interface HouseDetailsDto {
  id: number;
  name: string;
  description: string;
  property_type: number;
  address: string;
  max_guests: number;
  cancellation_policy: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  host: {
    id: number;
    is_superhost: boolean;
    is_verified: boolean;
    profile_photo: string;
  };
  images: Array<{
    id: number;
    image: string;
  }>;
  amenities: Array<{
    id: number;
    code: string;
    name: string;
  }>;
}

class CreateHouseBody {
  @ApiProperty({
    example: 'myAwesomeRoom',
    description: 'name',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'Big room with large balcony and mountain view',
    description: 'description',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'property_type',
    type: Number,
  })
  property_type: number;

  @ApiProperty({
    example: '56 Hoang Hoa Tham',
    description: 'address',
    type: String,
  })
  address: string;

  @ApiProperty({
    example: 3,
    description: 'max_guests',
    type: Number,
  })
  max_guests: number;

  @ApiProperty({
    example: 'Free cancellation 3 days before',
    description: 'cancellation_policy',
    type: String,
  })
  cancellation_policy: string;

  @ApiProperty({
    example: 2,
    description: 'bedrooms',
    type: Number,
  })
  bedrooms: number;

  @ApiProperty({
    example: 4,
    description: 'beds',
    type: Number,
  })
  beds: number;

  @ApiProperty({
    example: 1,
    description: 'bathrooms',
    type: Number,
  })
  bathrooms: number;

  @ApiProperty({
    example: 500000,
    description: 'price',
    type: Number,
  })
  price: number;

  @ApiProperty({
    example: 1,
    description: 'host_id',
    type: Number,
  })
  host_id: number;

  @ApiProperty({
    example: 1,
    description: 'location_id',
    type: Number,
  })
  location_id: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'image',
    type: String,
  })
  image: string;

  @ApiProperty({
    example: { id: [1, 2] },
    description: 'amenity',
    type: Object,
  })
  amenity: AmenityList;
}

class GetHouseDto {
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

export { HouseDetailsDto, CreateHouseBody, GetHouseDto };
