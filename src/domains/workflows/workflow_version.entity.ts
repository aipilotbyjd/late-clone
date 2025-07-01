import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { WorkflowEntity } from './workflow.entity';

@Entity('workflow_versions')
export class WorkflowVersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkflowEntity, (workflow) => workflow.versions)
  workflow: WorkflowEntity;

  @Column()
  version: string;

  @Column('jsonb')
  definition: any; // The full JSON structure of the workflow

  @CreateDateColumn()
  createdAt: Date;
}
