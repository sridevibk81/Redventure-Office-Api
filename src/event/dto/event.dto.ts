import { IsString, IsBoolean, IsOptional, IsNumber, IsDefined, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { IsObjectOfInstancesOf } from 'src/shared/custom.validate';
import { UserRole, UserDept } from '../../shared/user.entity';


export class CreateEventDTO {

  @IsString()
  employeeId: string;

  @IsString()
  employeeName: string;

  @IsString()
  doorDeviceId: string;

  @IsString()
  result: string;

  @IsString()
  event: string;
 
}


export class InputEventDTO {

  @IsString()
  id: string;

  @IsString()
  event: string;

  @IsObject()
  payload: Payload;
 
}

export class Payload {

  @IsString()
  employeeId: string;

  @IsString()
  doorDeviceId: string;
 
}

export class LoginDTO {
  @IsString()
  username: string;
  
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  cartId?: string;
}

