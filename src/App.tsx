import { showToast } from './services/toastService';
import Toast from './components/Toast';

function App() {
  return (
    <div className="App">
      <h1>토스트 테스트</h1>

      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => showToast('This is a success toast!', 'success')}
      >
        성공토스트
      </button>

      <button
        className="p-2 bg-red-500 text-white rounded ml-2"
        onClick={() => showToast('This is an error toast!', 'error')}
      >
        에러토스트
      </button>

      <Toast />
    </div>
  );
}

export default App;