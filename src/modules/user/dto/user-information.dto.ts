import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserInformationDto {
  @ApiProperty({ example: 'Jack Thomson', description: 'Name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string' })
  name: string;
}
