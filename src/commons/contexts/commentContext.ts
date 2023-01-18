import {
  createCommentAction,
  fetchCommentsAction,
} from 'commons/redux/commentReducer';
import { useAppSelector, useAppThunkDispatch } from 'commons/redux/hooks';
import { RootState } from 'commons/redux/types';
import CommentType from 'commons/types/comment.types';
import { ICommentRepository } from 'commons/types/module.types';
import constate from 'constate';

type UseCommentContextProps = {
  commentRepository: ICommentRepository;
};
const useCommentContext = ({ commentRepository }: UseCommentContextProps) => {
  const comments = useAppSelector((state: RootState) => state.comments);
  const dispatch = useAppThunkDispatch();

  const fetchComments = async () => {
    dispatch(
      fetchCommentsAction({
        repository: commentRepository,
        payload: undefined,
      }),
    );
  };

  const createComment = async (newComment: CommentType) => {
    dispatch(
      createCommentAction({
        repository: commentRepository,
        payload: newComment,
      }),
    );
  };

  return {
    comments,
    fetchComments,
    createComment,
  };
};

export const [
  CommentProvider,
  useComments,
  useFetchComments,
  useCreateComment,
] = constate(
  useCommentContext,
  value => value.comments,
  value => value.fetchComments,
  value => value.createComment,
);
