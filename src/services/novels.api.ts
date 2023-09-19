import { BaseApiService } from './base.api';

export default class NovelsApi extends BaseApiService {
  static baseUrl = 'novels';

  static async getSearchNovels() {
    return this.get<SearchNovel[]>('search');
  }

  static async getRandomNovels() {
    return this.get<RandomNovel[]>('random');
  }

  static async getNovels(params: Object) {
    return this.get<Page<Novel>>('', params);
  }

  static async getNovelByUrl(url: string) {
    return this.get<Novel>(url);
  }

  static async getNovelChaptersById(id: number) {
    return this.get<Chapters>(`${id}/chapters`);
  }

  static async getNovelReviewsById(id: number, params: Object) {
    return this.get<Page<Review & User>>(`${id}/reviews`, params);
  }

  static async postNovelReview(nid: number, reviewForm: ReviewForm) {
    return this.post<SimpleResponseContent>(`${nid}/reviews`, reviewForm);
  }

  static async getUserNovelReviewByid(id: number) {
    return this.get<Review | undefined>(`${id}/review`);
  }

  static async getChaptersByNovelUrlChapter(url: string, chapter: string) {
    return this.get<Chapter>(`${url}/chapters/${chapter}`);
  }
}
