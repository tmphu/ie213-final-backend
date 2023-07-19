import { ApiProperty } from '@nestjs/swagger/dist';

class CreateAmenityBody {
  @ApiProperty({
    example: 'dieu_hoa',
    description: 'code',
    type: String,
  })
  code: string;

  @ApiProperty({
    example: 'Điều hòa',
    description: 'name',
    type: String,
  })
  name: string;
}

class GetAmenityDto {
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

class UpdateAmenityBody {
  @ApiProperty({
    example: 'may_giat',
    description: 'code',
    type: String,
  })
  code: string;

  @ApiProperty({
    example: 'Máy giặt',
    description: 'name',
    type: String,
  })
  name: string;
}

export { CreateAmenityBody, GetAmenityDto, UpdateAmenityBody };
