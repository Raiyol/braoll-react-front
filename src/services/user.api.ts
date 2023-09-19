import { BaseApiService } from './base.api';

export default class UserApi extends BaseApiService {
  static baseUrl = 'users';

  static async getUserInfo() {
    return this.get<User>('info');
  }

  static async getUserInfoDetail() {
    return this.get<UserDetail>('info/detailed');
  }

  static async getBookmarkNovels() {
    return this.get<BookmarkNovel[]>('bookmarks');
  }

  static async insertBookmark(id_novel: number, chapter: number) {
    return this.post<SimpleResponseContent>('bookmark', { id_novel, chapter });
  }

  static async editBookmark(id_novel: number, chapter: number) {
    return this.put<SimpleResponseContent>('bookmark', { id_novel, chapter });
  }

  static async deleteBookmark(id_novel: number) {
    return this.delete('bookmark', { id_novel });
  }

  static async getReviews(page: number) {
    return this.get<Page<Review & User & Partial<Novel>>>('/reviews', { page });
  }

  static async getComments(page: number) {
    return this.get<Page<UserComment>>('/comments', { page });
  }
}
