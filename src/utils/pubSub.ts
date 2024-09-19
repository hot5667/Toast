// Toast 이벤트와 관련된 데이터 타입 정의
interface ToastEventData {
  message: string;
  type?: 'success' | 'error' | 'warning';
}

// 제네릭 타입을 사용하는 EventCallback 타입 정의
type EventCallback<T = any> = (data?: T) => void;

// PubSub 클래스
class PubSub {
  private events: { [key: string]: EventCallback<any>[] } = {};

  subscribe<T>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as EventCallback<any>);
  }

  unsubscribe<T>(event: string, callback: EventCallback<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  publish<T>(event: string, data?: T) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

export const pubSub = new PubSub();
