
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // In a real app, protect this endpoint!
    @Post()
    create(@Body() createUserDto: any) {
        // Basic hash mockup - ideally AuthRegister should handle this
        return this.usersService.create(createUserDto);
    }
}
