import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity'; 

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
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

  @ManyToOne(() => LawFirm, (lawFirm) => lawFirm.lawyers, { onDelete: 'SET NULL' })
  lawFirm: LawFirm;
}
