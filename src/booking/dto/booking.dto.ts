import { ApiProperty } from '@nestjs/swagger/dist';

class BookingRequestDto {
  @ApiProperty({
    example: 1,
    description: 'house_id',
    type: Number,
  })
  house_id: number;

  @ApiProperty({
    example: '2023-01-01',
    description: 'check_in_date',
    type: String,
  })
  check_in_date: string;

  @ApiProperty({
    example: '2023-01-05',
    description: 'check_out_date',
    type: String,
  })
  check_out_date: string;

  @ApiProperty({
    example: 2,
    description: 'guest_number',
    type: Number,
  })
  guest_number: number;

  @ApiProperty({
    example: 1,
    description: 'user_id',
    type: Number,
  })
  user_id: number;
}

class GetBookingDto {
  @ApiProperty({
    example: '1',
    description: 'userId',
    type: String,
  })
  userId: string;

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

export { BookingRequestDto, GetBookingDto };
