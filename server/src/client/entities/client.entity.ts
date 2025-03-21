import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn, OneToOne, OneToMany } from 'typeorm';

import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.clients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: User;

  @OneToMany(()=>File,(file)=>file.client,({onDelete:"CASCADE"}))
  file:File;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}