import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinColumn,OneToOne} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { LawFirm } from '../../law-firm/entities/law-firm.entity';
import { Client } from '../../client/entities/client.entity'
import { File } from '../../file/entities/file.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn()
  lawyer_id: number;

  @Column()
  address: string;

  @Column()
  phone_number: string;


  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => LawFirm, (lawFirm) => lawFirm.lawyers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'law_firm_id' })
  law_firm: LawFirm;

  @OneToMany(() => Client, (client) => client.lawyer)
  clients: Client[];

  @OneToMany(() => File, (file) => file.lawyer)
  files: File[];

  @OneToMany(() => Schedule, (schedule) => schedule.lawyer)
  schedules: Schedule[];
}