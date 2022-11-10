import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendEmailVerificationDto {
  @ApiProperty({
    example: '',
    description: 'Email address',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email address required' })
  emailAddress: string;
}
