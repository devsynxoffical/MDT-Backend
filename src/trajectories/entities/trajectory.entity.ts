
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Participant } from '../../participants/entities/participant.entity';
import { HourEntry } from '../../hours/entities/hour-entry.entity';

export enum TrajectoryStatus {
    STARTED = 'Started',
    COMPLETED = 'Completed',
    TERMINATED = 'Terminated',
}

@Entity()
export class Trajectory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Participant, (participant) => participant.trajectories)
    participant: Participant;

    @Column({ type: 'enum', enum: TrajectoryStatus, default: TrajectoryStatus.STARTED })
    status: TrajectoryStatus;

    @Column({ type: 'text' })
    reason: string; // Mandatory

    @Column({ type: 'text' })
    vulnerabilityExplanation: string; // Mandatory

    @Column('decimal', { precision: 10, scale: 2 })
    plannedHours: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    realizedHours: number;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @OneToMany(() => HourEntry, (entry) => entry.trajectory)
    hours: HourEntry[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
