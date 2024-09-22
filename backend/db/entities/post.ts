import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  readonly title: string;

  @Column({
    name: 'content',
    type: 'varchar',
  })
  readonly content: string;

  @Column({
    name: 'published',
    type: 'boolean',
  })
  readonly published: string;

  @ManyToOne(() => User)
  user: User;
}
