import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { CreateEventDTO, InputEventDTO } from './dto/event.dto';
import { EventRegister } from './event.entity';
import { EventService } from './event.service';



@Controller('iotevent')
export class EventController {
  constructor(
    private userService: UserService,
    private eventService: EventService,
  ) {}
  
  @Get()
  async index(): Promise<any> {
    const seqNumber = await this.eventService.getSeqNumber();
    return { seqNumber }
  }
 
  @Post()
  async create(@Body() reqObj: any): Promise<any> {  
    
    if(reqObj.eventType === 'heartbeat'){
      const seqNumber = await this.eventService.getSeqNumber();
      return { seqNumber, status : 'IOT Health status is good' }
    }else{
      const userObj = await this.userService.findByEmployeeId(reqObj);

    if(userObj && userObj.status === 'success' && (reqObj.eventType === 'enter' || reqObj.eventType === 'exit')){
      const eveObj = await this.eventService.getEmployeeStatus(reqObj);
      if(eveObj && eveObj.eventType === reqObj.eventType){
        return { event : reqObj.event, status : 'You are already '+reqObj.eventType};
      }else if(eveObj && eveObj.eventType !== reqObj.eventType){
        eveObj.eventType = reqObj.eventType;
        const eventStatusObj = await this.eventService.createEvent(eveObj);
        if(eventStatusObj){
          return { event : reqObj.event, status : 'successfully door '+reqObj.eventType};
        }else{
          return { event : reqObj.event, status : 'Insert/Update Error '+reqObj.eventType};
        }        
      }else{
        let eventReg = new EventRegister();
        const { employeeId, doorId } = reqObj.payload;
        eventReg.employeeId = employeeId;
        eventReg.doorDeviceId = doorId;
        eventReg.randomId = await this.eventService.getSeqNumber();
        eventReg.eventType = reqObj.eventType;
        eventReg.status = 'active';
        const eventStatusObj = await this.eventService.createEvent(eventReg);
        if(eventStatusObj){
          return { event : reqObj.event, status : 'successfully door '+reqObj.eventType};
        }else{
          return { event : reqObj.event, status : 'Insert/Update Error '+reqObj.eventType};
        }
      }
    }else{
      const { employeeId, doorId } = reqObj.payload;
      if(userObj.status === 'AuthorizedDoor'){
        return { status : 'User not Authorized for this Door- Employee Id: '+employeeId+'' };
      }else{
        return { status : 'User not exists- Employee Id: '+employeeId+'' };
      }
      
    }
    
        
    }
   
    
  }
 

}






