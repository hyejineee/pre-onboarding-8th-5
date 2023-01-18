import CommentType from './comment.types';

export interface IHttpClient {
  get: (endPoint: string, options?: any) => Promise<any>;
  post: (endPoint: string, payload: any, options?: any) => Promise<any>;
  delete: (endPoint: string, options?: any) => Promise<any>;
  put: (endPoint: string, payload: any, options?: any) => Promise<any>;
}

export interface ICommentRepository {
  fetchCommentsPage: (page: number) => Promise<CommentType[]>;
  fetchComments: () => Promise<CommentType[]>;
  fetchComment: (id: number) => Promise<CommentType>;
  createComment: (newComment: CommentType) => void;
  updateComment: (id: number, updated: CommentType) => void;
  deleteComment: (id: number) => void;
}
