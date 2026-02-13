
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Trajectory } from '../../trajectories/entities/trajectory.entity';

export enum HourType {
    INDIVIDUAL = 'Individual',
    GROUP = 'Group',
}

@Entity()
export class HourEntry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Trajectory, (trajectory) => trajectory.hours)
    trajectory: Trajectory;

    @Column('decimal', { precision: 5, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: HourType })
    type: HourType;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column({ default: false })
    isApproved: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
