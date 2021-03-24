import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity, User } from './user.entity';




@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    
  ) {}

  
  

  async findByEmployeeId(reqObj: any): Promise<any> {
    const { employeeId, doorId } = reqObj.payload;
    try {

      const users = await this.userRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.doors', 'doors')
      .where('employee."employeeId" =:employeeId', { employeeId: employeeId })
      .orderBy('employee."created"', 'ASC') 
      .getOne();  
      
      const doors =  (users && users.doors) || [];
      var doorData = doors && doors.length > 0 && doors.filter(x => doorId.includes(x.doorId)) || [];
      if(users && users.doors && doorData.length > 0){
        return { users, status:'success' };
      }else if(users && users.doors && doorData.length === 0){
        return { status : 'AuthorizedDoor', message : 'User not Authorized for this Door'};
      }else{  
        return { status : 'UserNotFound', message : 'User not exists'};
      }

     
      
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }


}
