import { Entity, Column, PrimaryGeneratedColumn, OneToOne,ManyToOne, BeforeInsert, OneToMany, Unique, JoinColumn, Index } from 'typeorm';
import { Door } from './door.entity';
//import { BatchId } from './batch.entity';

export enum UserRole {
  ADMIN = 'admin',
  SALES_USER = 'sales',
  HR_USER = 'hr',
}

export enum UserDept {
  TECH = 'tech',
  FINANCE = 'finance',
  MARKETTING = 'marketting',
}

export enum DoorDeviceId {
  MAIN_DOOR = 'main-110',
  SIDE_DOOR_1 = 'side-101',
  SIDE_DOOR_2 = 'side-102',
  BACK_DOOR_2 = 'back-103',
}

@Entity({ name: 'employee' })
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  employeeId: string;

  @Column()
  employeeName: string;

  @Column()
  email: string;

  @Column({ default: null })
  mobile: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: UserRole.SALES_USER })
  role: UserRole;

  @Column({ default: UserDept.TECH })
  department: UserDept
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created: Date;

  @OneToMany(type => Door, door => door.user)
  doors: Door[];

}