import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()export  class Task
{
@PrimaryGeneratedColumn()
id: number;
@Column()
description:string;
 
@Column()
start_time: Date;

@Column({ default: false })
completed: boolean;


@ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
@JoinColumn()
user: User;



}
