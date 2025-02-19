import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Lawyer } from '../../lawyer/entities/lawyer.entity';

@Entity()
export class LawFirm {
  @PrimaryGeneratedColumn()
  law_firm_id: number;

  @Column()
  firm_name: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column('jsonb')
  roles: object;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.law_firm)
  users: User[];

  @OneToMany(() => Lawyer, (lawyer) => lawyer.lawyer_id)
  lawyers: Lawyer[];
}