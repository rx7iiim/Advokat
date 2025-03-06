import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,JoinColumn} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Lawyer } from '../../lawyer/entities/lawyer.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  file_id: number;

  @Column()
  file_name: string;

  @Column()
  file_path: string;

  @Column()
  Client_Background: string;

  @Column()
  Case_Details: string;

  @Column('jsonb')
  witnesses: object;

  @Column('jsonb')
  documents: object;

  @Column('jsonb')
  laws: object;

  @Column('jsonb')
  defense_strategy: object;

  @Column('jsonb')
  negotiations: object;

  @ManyToOne(() => Client, (client) => client.client_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawyer_id' })
  lawyer: Lawyer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}