import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: {
      expiresIn: 18000
    }
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository]
})
export class AuthModule { }
