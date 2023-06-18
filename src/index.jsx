import ReactDOM from 'react-dom/client';

// redux provider
import { Provider } from 'react-redux';

// global state
import store from './state/index';

// component
import App from './App';

// React Toastify
import { ToastContainer } from 'react-toastify';

// Vendors Styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </>
);

