// Toast.jsx
import { toast } from 'react-hot-toast';

const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  promise: (promiseFn, messages) =>
    toast.promise(promiseFn, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong!',
    }),
};

export default showToast;
