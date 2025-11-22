import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Author } from '../author/author';

@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Author, author => author.posts)
  author?: Relation<Author>;

  @Column({ nullable: false })
  authorId!: number;

}
