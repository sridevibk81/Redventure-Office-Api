import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { CreateDTO } from './dto/user.dto';
import { Payload } from './dto/payload';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../shared/validation.pipe';


@Controller('iotauth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  
   

}






