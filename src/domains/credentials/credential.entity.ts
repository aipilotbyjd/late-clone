import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('credentials')
export class CredentialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string; // 'google', 'slack', 'github'

    @Column()
    userId: string;

    @Column('jsonb')
    data: any; // token, profile, etc.

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
