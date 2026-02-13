
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trajectory } from '../../trajectories/entities/trajectory.entity';

@Entity()
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    dob: Date;

    @Column({ nullable: true })
    email: string; // Optional per req

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    city: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Trajectory, (trajectory) => trajectory.participant)
    trajectories: Trajectory[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
