import ReactDOM from 'react-dom/client';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'commons/redux/store';
import { CommentProvider } from 'commons/contexts/commentContext';
import HttpClient from 'commons/util/HttpClient';
import CommentRepository from 'commons/repository/CommentRepository';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const httpClient = new HttpClient('http://localhost:4000');
const commentRepository = new CommentRepository(httpClient);

root.render(
  <Provider store={store}>
    <CommentProvider commentRepository={commentRepository}>
      <App />
    </CommentProvider>
  </Provider>,
);
