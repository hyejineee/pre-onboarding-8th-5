import { useCallback, useEffect } from 'react';
import {
  useComments,
  useCreateComment,
  useCurrentPage,
  useFetchComments,
  useFetchCommentsPage,
  useTotalComment,
} from 'commons/contexts/commentContext';
import CommentList from 'components/commentList';
import Pagination from 'components/pagination';
import CommentForm from 'components/commentForm';
import styled from 'styled-components';
import { PAGE_LIMIT } from 'commons/constants/pagination';
import CommentType from 'commons/types/comment.types';

const Wrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

function App() {
  const comments = useComments();
  const totalComment = useTotalComment();
  const currentPage = useCurrentPage();

  const fetchComments = useFetchComments();
  const fetchCommentsPage = useFetchCommentsPage();
  const createComment = useCreateComment();

  useEffect(() => {
    fetchComments();
    fetchCommentsPage(1);
  }, []);

  const handleChangeCurrentPage = useCallback(
    (page: number) => {
      fetchCommentsPage(page);
    },
    [fetchCommentsPage],
  );

  const handleClickRegister = useCallback(
    (newComment: Omit<CommentType, 'id'>) => {
      createComment(newComment);
    },
    [createComment],
  );

  const handleClickUpdate = useCallback(
    (updated: Omit<CommentType, 'id' | 'createdAt'>) => {},
    [],
  );

  return (
    <Wrapper>
      <CommentList comments={comments} />
      <Pagination
        totalItems={totalComment}
        limit={PAGE_LIMIT}
        currentPage={currentPage}
        onChangePage={handleChangeCurrentPage}
      />
      <CommentForm
        isEdit={false}
        onClickRegister={handleClickRegister}
        onClickUpdate={handleClickUpdate}
      />
    </Wrapper>
  );
}

export default App;
