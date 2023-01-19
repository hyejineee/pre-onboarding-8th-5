import { AxiosResponse } from 'axios';
import CommentType from 'commons/types/comment.types';
import { ICommentRepository, IHttpClient } from 'commons/types/module.types';

export default class CommentRepository implements ICommentRepository {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async fetchCommentsPage(page: number) {
    try {
      const { data } = (await this.httpClient.get(
        `/comments?_page=${page}&_limit=5&_order=desc&_sort=id`,
      )) as AxiosResponse<CommentType[]>;
      return data;
    } catch (e) {
      throw new Error('댓글 목록 가져오기에 실패했습니다.');
    }
  }

  async fetchComments() {
    try {
      const { data } = (await this.httpClient.get(
        '/comments',
      )) as AxiosResponse<CommentType[]>;
      return data;
    } catch (e) {
      throw new Error('댓글 목록 가져오기에 실패했습니다.');
    }
  }

  async fetchComment(id: number) {
    try {
      const { data } = (await this.httpClient.get(
        `/comments/${id}`,
      )) as AxiosResponse<CommentType>;
      return data;
    } catch (e) {
      throw new Error('댓글 가져오기에 실패했습니다.');
    }
  }

  async createComment(newComment: CommentType) {
    try {
      await this.httpClient.post('/comments', { ...newComment });
    } catch (e) {
      throw new Error('댓글 작성에 실패했습니다.');
    }
  }

  async updateComment(id: number, updated: CommentType) {
    try {
      await this.httpClient.put(`/comments/${id}`, { ...updated });
    } catch (e) {
      throw new Error('댓글 수정에 실패했습니다.');
    }
  }

  async deleteComment(id: number) {
    try {
      await this.httpClient.delete(`/comments/${id}`);
    } catch (e) {
      throw new Error('댓글 삭제에 실패했습니다.');
    }
  }
}
