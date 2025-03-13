import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Lawyer } from '../../lawyer/entities/lawyer.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

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

  @OneToMany(() => Lawyer, (lawyer) => lawyer.lawyer_id)
  lawyers: Lawyer[];  
}