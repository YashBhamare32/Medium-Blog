import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity('posts')
export class Post {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  readonly id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'varchar',
  })
  content: string;

  @Column({
    name: 'published',
    type: 'boolean',
    default: false,
  })
  published: boolean;

  @Column()
  readonly authorId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedDate: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  user: User;
}
