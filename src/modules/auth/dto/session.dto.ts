import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({ description: 'User id' })
  userId: number;

  @ApiProperty({ description: 'Account role' })
  accountRole: string;

  @ApiProperty({ description: 'Account type' })
  accountType: string;
}
