import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    name: 'username',
    type: 'varchar',
  })
  readonly username: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  readonly name: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  readonly password: string;

  @OneToMany(() => Post, (post) => post.user)
  readonly posts: Post[];
}
