import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'db/entities/post';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBlogDto, GetBlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async createBlog(postBody: CreateBlogDto, authorId: string): Promise<Post>{
        console.log(postBody);
        const blog = {
            title: postBody.title,
            content: postBody.content,
            published: postBody.published,
            authorId,
        };
         try {
            return await this.postRepository.save(blog);
         } catch (error) {
            throw new InternalServerErrorException(error.message)
         }
    }

    async updateBlog(id:string, updateBody: CreateBlogDto): Promise<Post>{
        const blog = await this.postRepository.findOne({where: {id}});
        if(!blog){
            throw new NotFoundException("Blog not found");
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

    async getBlog(id: string): Promise<Post> {
        try {
            console.log(`Attempting to fetch post for id ${id}`);
            const blog= await this.postRepository.findOne({ where: { id } });
            if(!blog){
                throw new NotFoundException(`Blog not found`);
            }
            return blog;
        } catch (error) {
            return error.response;
        }
    }

    async getAllBlogs(): Promise<Post[]> {
        try {
            console.log(`Attempting to fetch blogs`);
            return await this.postRepository.find();
        } catch (error) {
            return error.response;
        }
    }

    async deleteBlog(id: string): Promise<Post>{
        try {
            console.log(`Attempting to fetch post for id ${id}`);
            const blog= await this.postRepository.findOne({ where: { id } });
            if(!blog){
                throw new NotFoundException(`Blog not found`);
            }
            await this.postRepository.delete({id});
            return blog;
        } catch (error) {
            return error.response;
        }
    }
    
}