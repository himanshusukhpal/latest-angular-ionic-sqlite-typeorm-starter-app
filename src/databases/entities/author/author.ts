import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post';

@Entity('authors')
export class Author {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @OneToMany('posts', 'authors', {
    persistence: true,
    onDelete: 'CASCADE',
  })
  posts?: Post[];

}
