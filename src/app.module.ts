
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { Participant } from './participants/entities/participant.entity';
import { Trajectory } from './trajectories/entities/trajectory.entity';
import { HourEntry } from './hours/entities/hour-entry.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Allow using a single connection string (common in Render/Railway)
      url: process.env.DATABASE_URL,
      // Fallback to individual params if no URL provided
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'crm_db',
      entities: [User, Participant, Trajectory, HourEntry],
      synchronize: true, // Auto-create tables (dev/MVP only)
      // SSL is often required for production PaaS databases
      ssl: process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
