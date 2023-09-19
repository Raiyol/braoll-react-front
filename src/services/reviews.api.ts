import { BaseApiService } from './base.api';

export default class ReviewsApi extends BaseApiService {
  static baseUrl = 'reviews';

  static async postLikes(rid: number) {
    return this.post<SimpleResponseContent>(`${rid}/like`);
  }

  static async deleteLikes(rid: number) {
    return this.delete<SimpleResponseContent>(`${rid}/like`);
  }

  static async editReview(rid: number, reviewForm: ReviewForm) {
    return this.put<SimpleResponseContent>(`${rid}`, reviewForm);
  }
}
