import { Body, Controller, Post } from '@nestjs/common';
import {
  WordpressService,
  WordPressPostDto,
} from '../wordpress/wordpress.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly wordpressService: WordpressService) {}

  @Post()
  async createPost(@Body() createPostDto: WordPressPostDto) {
    return this.wordpressService.createPost(createPostDto);
  }
}
