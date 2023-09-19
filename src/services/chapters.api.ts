import { BaseApiService } from './base.api';

export default class ChaptersApi extends BaseApiService {
  static baseUrl = 'chapters';

  static async getCommentsByChapterId(id: number, page: number) {
    return this.get<Page<UserComment>>(`${id}/comments`, { pageNumber: page, pageSize: 10 });
  }

  static async postCommentByChapterId(id: number, body: CommentForm) {
    return this.post<SimpleResponseContent>(`${id}/comments`, body);
  }

  static async getRecentChapters() {
    return this.get<RecentChapter[]>('recent');
  }
}
