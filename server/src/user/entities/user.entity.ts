import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Lawyer } from 'src/lawyer/entities/lawyer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber:number;

  @Column()
  firmLawyer: boolean;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  confirmationExpires: Date;


  @Column({ type: 'enum', enum: ['Firm Manager', 'single lawyer','lawyer'],default:"single lawyer" })
  role: string;

  @Column()
  plan:string;

 
  @OneToOne(() => Subscription, (subscription) => subscription.user, { onDelete: 'CASCADE' })
  subscription: Subscription;

  @OneToOne(()=>Lawyer,(lawyer)=>lawyer.user,{onDelete:"CASCADE"} )
  lawyerId:Lawyer;
}