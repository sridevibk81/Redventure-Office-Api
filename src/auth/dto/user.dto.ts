import { IsString, IsBoolean, IsOptional, IsNumber, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { IsObjectOfInstancesOf } from 'src/shared/custom.validate';
import { UserRole, UserDept } from './../../shared/user.entity';


export class CreateDTO {
  @IsString()
  employeeId: string;

  @IsString()
  employeeName: string;

  @IsString()
  email: string;

  @IsString()
  mobile: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  department?: UserDept;

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

