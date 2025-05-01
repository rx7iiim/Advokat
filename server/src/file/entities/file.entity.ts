import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,JoinColumn} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';


@Entity()
export class File {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  name: string;

  @Column()
  file_path: string;

  @Column({type:'enum',enum:["active",'done'],default:"active"})
 status:string;



@Column()
date:Date

@Column()
updated:Date 

@Column()
size:Number


  @ManyToOne(() => Client, (client) => client.client_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}