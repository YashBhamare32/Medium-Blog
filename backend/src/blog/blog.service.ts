import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'db/entities/post';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBlogDto, GetBlogByIdDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createBlog(postBody: CreateBlogDto, authorId: string): Promise<Post> {
    console.log(postBody);
    const blog = {
      title: postBody.title,
      content: postBody.content,
      published: postBody.published,
      publishedDate: new Date(),
      authorId,
    };
    try {
      return await this.postRepository.save(blog);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateBlog(id: string, updateBody: CreateBlogDto): Promise<Post> {
    const blog = await this.postRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    try {
      blog.title = updateBody.title;
      blog.content = updateBody.content;
      blog.published = updateBody.published;
      return await this.postRepository.save(blog);
    } catch (error) {
      return error.response;
    }
  }

  async getBlogById(id: string): Promise<Post> {
    try {
      console.log(`Attempting to fetch post for id ${id}`);
      const blog = await this.postRepository.findOne({
        where: { id },
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });
      if (!blog) {
        throw new NotFoundException(`Blog not found`);
      }
      return blog;
    } catch (error) {
      return error.response;
    }
  }

  async getBlogByUser(authorId: string): Promise<Post[]> {
    try {
      console.log(`Attempting to fetch post for id ${authorId}`);
      const blog = await this.postRepository.find({
        where: { authorId },
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });
      if (!blog) {
        throw new NotFoundException(`Blog not found`);
      }
      return blog;
    } catch (error) {
      return error.response;
    }
  }

  async getAllBlogs(): Promise<Post[]> {
    try {
      const blogs = await this.postRepository.find({
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });
      if (!blogs) {
        throw new NotFoundException(`Blogs not found`);
      }
      return blogs;
    } catch (error) {
      return error.response;
    }
  }

  async deleteBlog(id: string): Promise<Post> {
    try {
      console.log(`Attempting to fetch post for id ${id}`);
      const blog = await this.postRepository.findOne({ where: { id } });
      if (!blog) {
        throw new NotFoundException(`Blog not found`);
      }
      await this.postRepository.delete({ id });
      return blog;
    } catch (error) {
      return error.response;
    }
  }
}
