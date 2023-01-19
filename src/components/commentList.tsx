import CommentType from 'commons/types/comment.types';
import Comment from './comment';

type CommentListPropsType = {
  comments: CommentType[];
};
export default function CommentList({ comments }: CommentListPropsType) {
  return (
    <div>
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
      ;
    </div>
  );
}
