import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface WordPressPostDto {
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'private' | 'pending';
  categories?: number[];
  tags?: number[];
  featured_media?: number;
  excerpt?: string;
}

@Injectable()
export class WordpressService {
  private readonly logger = new Logger(WordpressService.name);
  private readonly apiClient: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const apiUrl = this.configService.get<string>('WORDPRESS_API_URL');
    const username = this.configService.get<string>('WORDPRESS_USERNAME');
    const password = this.configService.get<string>('WORDPRESS_APP_PASSWORD');

    if (!apiUrl || !username || !password) {
      throw new Error('WordPress API configuration is missing');
    }

    this.apiClient = axios.create({
      baseURL: apiUrl,
      auth: {
        username,
        password,
      },
    });
  }

  async createPost(postData: WordPressPostDto): Promise<any> {
    try {
      this.logger.log(`Creating WordPress post: ${postData.title}`);

      const response = await this.apiClient.post('/posts', {
        title: postData.title,
        content: postData.content,
        status: postData.status,
        categories: postData.categories,
        tags: postData.tags,
        featured_media: postData.featured_media,
        excerpt: postData.excerpt,
      });

      this.logger.log(`Post created successfully: ${response.data.link}`);
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error creating WordPress post: ${
          error.response?.data?.message || error.message
        }`,
      );
      throw error;
    }
  }
}
