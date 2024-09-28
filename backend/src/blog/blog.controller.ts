import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  CreateBlogDto,
  GetBlogByIdDto,
  GetBlogByUserDto,
} from './dtos/blog.dto';
import { AuthGuard } from './user.auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createBlog(@Body() postBody: CreateBlogDto, @Request() req: Request) {
    const authorId = req['user'].id;
    return await this.blogService.createBlog(postBody, authorId);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateBlog(
    @Body() updateBody: CreateBlogDto,
    @Param() id: GetBlogByIdDto,
  ) {
    return await this.blogService.updateBlog(id.id, updateBody);
  }

  @Get('/blogId/:id')
  @UseGuards(AuthGuard)
  async getBlogById(@Param() id: GetBlogByIdDto) {
    return await this.blogService.getBlogById(id.id);
  }

  @Get('/authorId/:authorId')
  @UseGuards(AuthGuard)
  async getBlogByUser(@Param() authorId: GetBlogByUserDto) {
    return await this.blogService.getBlogByUser(authorId.authorId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllBlogs() {
    return await this.blogService.getAllBlogs();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteBlog(@Param() id: GetBlogByIdDto) {
    return await this.blogService.deleteBlog(id.id);
  }
}
