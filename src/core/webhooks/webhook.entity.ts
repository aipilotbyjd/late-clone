import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('webhooks')
export class WebhookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  path: string; // e.g., '/webhooks/abc123'

  @Column()
  workflowId: string; // the workflow to trigger

  @Column('jsonb', { nullable: true })
  config: any; // optional filtering config

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
