import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Program } from './program.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: Program, isArray: true })
  @ManyToMany(() => Program, { cascade: true })
  @JoinTable()
  @Expose()
  programs: Program[];
}
