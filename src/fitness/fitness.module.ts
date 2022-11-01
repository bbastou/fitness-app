import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FitnessService } from './fitness.service';
import { Category } from './category.entity';
import { Program } from './program.entity';
import { Exercise } from './exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Program, Exercise])],
  providers: [FitnessService],
  exports: [FitnessService],
})
export class FitnessModule {}
