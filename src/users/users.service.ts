
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'passwordHash', 'role', 'firstName', 'lastName']
        });
    }

    async create(userData: any): Promise<User> {
        const { password, ...rest } = userData;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = this.usersRepository.create({
            ...rest,
            passwordHash,
        });
        // save usually returns the single entity if passed a single entity
        return this.usersRepository.save(newUser);
    }
}
