import { Body, Controller, Post } from '@nestjs/common';
import { WordpressService } from '../wordpress/wordpress.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly wordpressService: WordpressService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.wordpressService.createPost(createPostDto);
  }
}
