import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email address',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email address is required' })
  emailAddress: string;

  @ApiProperty({
    example: '12345',
    description: 'Password',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    example: 'jack',
    description: 'Your personal name',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
