export class CreatePostDto {
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'private' | 'pending' = 'draft';
  categories?: number[];
  tags?: number[];
  featured_media?: number;
  excerpt?: string;
}
