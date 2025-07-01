import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  exports: [TypeOrmModule],
})
export class TeamModule {}
