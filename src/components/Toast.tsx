import React, { useEffect, useState } from 'react';
import { pubSub } from '../utils/pubSub';

interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'warning';
  padding?: string;  // 패딩 값 추가
}

const Toast: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleNewToast = (toast: ToastMessage) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.slice(1)); // 일정 시간 후 첫번째 토스트 삭제
      }, 3000); // 토스트가 3초 후에 사라지도록 설정
    };

    // 'show-toast' 이벤트 구독
    pubSub.subscribe<ToastMessage>('show-toast', handleNewToast);

    return () => {
      pubSub.unsubscribe<ToastMessage>('show-toast', handleNewToast);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg text-white ${getToastStyle(toast.type)}`}
          style={{ padding: toast.padding }}  // 패딩 적용
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

const getToastStyle = (type?: 'success' | 'error' | 'warning') => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return 'bg-blue-500';
  }
};

export default Toast;
