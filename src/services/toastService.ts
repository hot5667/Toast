import { pubSub } from '../utils/pubSub';

export const showToast = (message: string, type?: 'success' | 'error' | 'warning') => {
  pubSub.publish('show-toast', { message, type });
};
