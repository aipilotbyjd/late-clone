import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('notification_hooks')
export class NotificationHook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    workflowId: string;

    @Column({ type: 'enum', enum: ['email', 'webhook'] })
    type: 'email' | 'webhook';

    @Column('jsonb')
    config: any;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
