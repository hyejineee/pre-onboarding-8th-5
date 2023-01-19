import {
  useDeleteComment,
  useSelectUpdatedComment,
} from 'commons/contexts/commentContext';
import CommentType from 'commons/types/comment.types';
import styled from 'styled-components';
import Comment from './comment';

type CommentListPropsType = {
  comments: CommentType[];
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CommentList({ comments }: CommentListPropsType) {
  const deleteComment = useDeleteComment();
  const selectUpdatedComment = useSelectUpdatedComment();

  const handleClickDelete = (id: number) => () => {
    deleteComment(id);
  };

  const handleClickUpdate = (comment: CommentType) => () => {
    selectUpdatedComment(comment);
  };

  return (
    <Wrapper>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          profileUrl={comment.profile_url}
          author={comment.author}
          content={comment.content}
          createAt={comment.createdAt}
          onClickDelete={handleClickDelete(comment.id || -1)}
          onClickUpdate={handleClickUpdate(comment)}
        />
      ))}
    </Wrapper>
  );
}
