import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { WorkflowEntity } from '../workflows/workflow.entity';

@Entity('executions')
export class ExecutionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => WorkflowEntity, { eager: true })
    workflow: WorkflowEntity;

    @Column({ default: 'success' })
    status: 'success' | 'error' | 'running';

    @Column({ type: 'jsonb', nullable: true })
    input: any;

    @Column({ type: 'jsonb', nullable: true })
    output: any;

    @Column({ type: 'jsonb', nullable: true })
    error: any;

    @CreateDateColumn()
    startedAt: Date;
}
