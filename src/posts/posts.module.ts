import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { WordpressModule } from '../wordpress/wordpress.module';

@Module({
  imports: [WordpressModule],
  controllers: [PostsController],
})
export class PostsModule {}
