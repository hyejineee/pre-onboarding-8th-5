import {
  createCommentAction,
  deleteCommentAction,
  fetchCommentsAction,
  fetchCommentsPageAction,
  setUpdatedComment,
  updateCommentAction,
} from 'commons/redux/commentReducer';
import {
  useAppDispatch,
  useAppSelector,
  useAppThunkDispatch,
} from 'commons/redux/hooks';
import { RootState } from 'commons/redux/types';
import CommentType from 'commons/types/comment.types';
import {
  ICommentRepository,
  ICommentService,
} from 'commons/types/module.types';
import constate from 'constate';
import { stat } from 'fs';
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
  const updatedComment = useAppSelector(
    (state: RootState) => state.comment.updatedComment,
  );

  const asyncDispatch = useAppThunkDispatch();
  const dispatch = useAppDispatch();

  const fetchComments = useCallback(async () => {
    asyncDispatch(
      fetchCommentsAction({
        repository: commentRepository,
        payload: undefined,
      }),
    );
  }, [commentRepository, asyncDispatch]);

  const fetchCommentsPage = useCallback(
    async (pageNumber: number) => {
      asyncDispatch(
        fetchCommentsPageAction({
          repository: commentRepository,
          payload: pageNumber,
        }),
      );
    },
    [commentRepository, asyncDispatch],
  );

  const createComment = useCallback(
    async (newComment: Omit<CommentType, 'id'>) => {
      asyncDispatch(
        createCommentAction({
          repository: commentRepository,
          payload: newComment,
        }),
      );
    },
    [commentRepository, asyncDispatch],
  );

  const updateComment = useCallback(
    async (id: number, updated: CommentType) => {
      asyncDispatch(
        updateCommentAction({
          repository: commentRepository,
          payload: { id, comment: updated, page: currentPage },
        }),
      );

      dispatch(setUpdatedComment(undefined));
    },
    [commentRepository, asyncDispatch, currentPage, dispatch],
  );

  const deleteComment = useCallback(
    async (id: number) => {
      asyncDispatch(
        deleteCommentAction({
          repository: commentRepository,
          payload: id,
        }),
      );
    },
    [commentRepository, asyncDispatch],
  );

  const selectUpdatedComment = useCallback(
    (edited: CommentType) => {
      dispatch(setUpdatedComment(edited));
    },
    [dispatch],
  );

  return {
    comments,
    currentPage,
    totalComment,
    updatedComment,
    fetchCommentsPage,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    selectUpdatedComment,
  };
};

export const [
  CommentProvider,
  useComments,
  useTotalComment,
  useCurrentPage,
  useUpdatedComment,
  useFetchComments,
  useFetchCommentsPage,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
  useSelectUpdatedComment,
] = constate(
  useCommentContext,
  value => value.comments,
  value => value.totalComment,
  value => value.currentPage,
  value => value.updatedComment,

  value => value.fetchComments,
  value => value.fetchCommentsPage,
  value => value.createComment,
  value => value.updateComment,
  value => value.deleteComment,
  value => value.selectUpdatedComment,
);
