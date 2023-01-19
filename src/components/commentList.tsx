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
  return (
    <Wrapper>
      {comments.map(({ id, profile_url, author, content, createdAt }) => (
        <Comment
          key={id}
          profileUrl={profile_url}
          author={author}
          content={content}
          createAt={createdAt}
          onClickDelete={() => {}}
          onClickUpdate={() => {}}
        />
      ))}
    </Wrapper>
  );
}
