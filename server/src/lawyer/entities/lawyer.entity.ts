import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity'; 
import { User } from 'src/user/entities/user.entity';
import { isNotEmpty } from 'class-validator';

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column()
  lawyerUsername: string;

  
  @Column({ unique: true ,nullable:false})
  phoneNumber: string;

  @Column()
  contactInfo: string;

  @Column({ type: 'int', default: 0 })
  numberOfCasesLost: number;

  @Column()
  email:string ;

  @Column({nullable:true})
  pfp:string;

  @Column({ type: 'int', default: 0 })
  numberOfCasesWon: number;

  @Column({ type: 'int' })
  experienceYears: number;

  @ManyToOne(() => User, (user) => user.lawyers, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;


}
