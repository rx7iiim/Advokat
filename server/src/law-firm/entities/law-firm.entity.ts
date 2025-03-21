import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class LawFirm {

  @PrimaryGeneratedColumn()
  lawFirmId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  lawFirmName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: number;

  @Column()
  employeesNumber:number;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  confirmationExpires: Date; 

  
  @OneToOne(() => Subscription, (subscription) => subscription.law_firm, { onDelete: 'CASCADE' })
  subscription: Subscription;

  @OneToMany(() => User, (user) => user.userId)
  lawyers: User[];  
}