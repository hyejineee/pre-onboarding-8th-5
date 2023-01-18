import { useEffect } from 'react';
import { useFetchComments } from 'commons/contexts/commentContext';

function App() {
  const fetchComments = useFetchComments();

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return <div>PROJECT INIT</div>;
}

export default App;
