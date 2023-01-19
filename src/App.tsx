import { useEffect } from 'react';
import {
  useComments,
  useFetchComments,
  useFetchCommentsPage,
} from 'commons/contexts/commentContext';
import CommentList from 'components/commentList';

function App() {
  const fetchComments = useFetchComments();
  const fetchCommentsPage = useFetchCommentsPage();
  const comments = useComments();

  useEffect(() => {
    fetchComments();
    fetchCommentsPage(1);
  }, []);

  return (
    <div>
      <CommentList comments={comments} />
    </div>
  );
}

export default App;
