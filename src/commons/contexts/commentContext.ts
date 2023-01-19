import {
  createCommentAction,
  deleteCommentAction,
  fetchCommentsAction,
  fetchCommentsPageAction,
  updateCommentAction,
} from 'commons/redux/commentReducer';
import { useAppSelector, useAppThunkDispatch } from 'commons/redux/hooks';
import { RootState } from 'commons/redux/types';
import CommentType from 'commons/types/comment.types';
import {
  ICommentRepository,
  ICommentService,
} from 'commons/types/module.types';
import constate from 'constate';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

type UseCommentContextProps = {
  commentRepository: ICommentRepository;
};
const useCommentContext: (props: UseCommentContextProps) => ICommentService = ({
  commentRepository,
}: UseCommentContextProps) => {
  const comments = useSelector((state: RootState) => state.comment.comments);
  const currentPage = useAppSelector((state: RootState) => state.comment.page);
  const totalComment = useAppSelector(
    (state: RootState) => state.comment.totalComment,
  );

  const dispatch = useAppThunkDispatch();

  const fetchComments = useCallback(async () => {
    dispatch(
      fetchCommentsAction({
        repository: commentRepository,
        payload: undefined,
      }),
    );
  }, [commentRepository, dispatch]);

  const fetchCommentsPage = useCallback(
    async (pageNumber: number) => {
      dispatch(
        fetchCommentsPageAction({
          repository: commentRepository,
          payload: pageNumber,
        }),
      );
    },
    [commentRepository, dispatch],
  );

  const createComment = useCallback(
    async (newComment: CommentType) => {
      dispatch(
        createCommentAction({
          repository: commentRepository,
          payload: newComment,
        }),
      );
    },
    [commentRepository, dispatch],
  );

  const updateComment = useCallback(
    async (id: number, updated: CommentType) => {
      dispatch(
        updateCommentAction({
          repository: commentRepository,
          payload: { id, comment: updated, page: currentPage },
        }),
      );
    },
    [commentRepository, dispatch, currentPage],
  );

  const deleteComment = useCallback(
    async (id: number) => {
      dispatch(
        deleteCommentAction({
          repository: commentRepository,
          payload: id,
        }),
      );
    },
    [commentRepository, dispatch],
  );

  return {
    comments,
    currentPage,
    totalComment,
    fetchCommentsPage,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
  };
};

export const [
  CommentProvider,
  useComments,
  useFetchComments,
  useFetchCommentsPage,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
] = constate(
  useCommentContext,
  value => value.comments,
  value => value.fetchComments,
  value => value.fetchCommentsPage,
  value => value.createComment,
  value => value.updateComment,
  value => value.deleteComment,
);
