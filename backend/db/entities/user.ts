import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post';

@Entity('user')
export class User {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: ()=> 'gen_random_uuid()'
  })
  readonly id: string;

  @Column({
    name: 'username',
    type: 'varchar',
  })
  username: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
