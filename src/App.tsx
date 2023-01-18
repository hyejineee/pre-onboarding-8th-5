import { useEffect } from 'react';
import { fetchComments } from 'redux/commentReducer';
import { useAppThunkDispatch } from 'redux/hooks';

function App() {
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(fetchComments({}));
  }, [dispatch]);
  return <div>PROJECT INIT</div>;
}

export default App;
