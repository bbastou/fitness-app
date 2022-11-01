import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exercise } from './exercise.entity';

@Entity('programs')
export class Program {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: Exercise, isArray: true })
  @ManyToMany(() => Exercise, { cascade: true })
  @JoinTable()
  exercises: Exercise[];
}
