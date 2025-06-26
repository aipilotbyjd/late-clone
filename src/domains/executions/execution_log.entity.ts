import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { ExecutionEntity } from './execution.entity';

@Entity('execution_logs')
export class ExecutionLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExecutionEntity)
    execution: ExecutionEntity;

    @Column()
    nodeId: string;

    @Column({ type: 'jsonb', nullable: true })
    input: any;

    @Column({ type: 'jsonb', nullable: true })
    output: any;

    @Column({ type: 'jsonb', nullable: true })
    error: any;

    @CreateDateColumn()
    timestamp: Date;
}
