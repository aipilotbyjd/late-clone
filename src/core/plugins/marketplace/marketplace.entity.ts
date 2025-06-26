import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('marketplace_plugins')
export class MarketplaceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;           // e.g. 'n8n-nodes-gmail'

    @Column()
    description: string;

    @Column()
    version: string;        // e.g. '1.0.0'

    @Column({ default: false })
    installed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
