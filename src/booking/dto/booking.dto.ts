import { ApiProperty } from '@nestjs/swagger/dist';

class BookingRequestDto {
  @ApiProperty({
    example: 1,
    description: 'user_id',
    type: Number,
  })
  user_id: number;

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
    example: 'vnpay',
    description: 'payment_method',
    type: String,
  })
  payment_method: string;
}

class CreatePaymentTransactionDto {
  @ApiProperty({
    example: 1,
    description: 'booking_id',
    type: Number,
  })
  booking_id: number;

  @ApiProperty({
    example: '1689956015297',
    description: 'ref',
    type: String,
  })
  ref: string;

  @ApiProperty({
    example: '1000000',
    description: 'amount',
    type: String,
  })
  amount: string;

  @ApiProperty({
    example: '20230721231407',
    description: 'payment_date',
    type: String,
  })
  payment_date: string;

  @ApiProperty({
    example: true,
    description: 'is_success',
    type: Boolean,
  })
  is_success: boolean;

  @ApiProperty({
    example: 'VNPAY - NCB - ATM',
    description: 'payment_gateway',
    type: String,
  })
  payment_gateway: string;

  @ApiProperty({
    example: '14073003',
    description: 'transaction_no',
    type: String,
  })
  transaction_no: string;
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

export { BookingRequestDto, GetBookingDto, CreatePaymentTransactionDto };
