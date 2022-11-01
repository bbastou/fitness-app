import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty({
    example: 'e495e06f-e643-4e9f-a868-485150d3530b',
    description: 'User unique identifier for vendor',
  })
  id: string;

  @Column()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNDk1ZTA2Zi1lNjQzLTRlOWYtYTg2OC00ODUxNTBkMzUzMGIiLCJpYXQiOjE2NjcyMTY5Njh9.0tRK1y1Y9kKp82JeLwwZWCy48hjjOKfbWFbvAsEJ73A',
    description: 'User current JWT token',
  })
  token: string;
}
