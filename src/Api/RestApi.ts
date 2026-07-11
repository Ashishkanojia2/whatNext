import { resetToLogin } from '../helper/NavigationHelper';
import showToast from '../utils/showToast';
import { BASE_URL } from './Global';

type RestApiProps = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  endpoint: string;
  request?: any;
  headers?: any;
};
const RestApi = async ({
  method = 'GET',
  endpoint,
  request,
  headers = {},
}: RestApiProps) => {
  try {
    const isFormData = request instanceof FormData;

    const options: any = {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
    };

    if (method !== 'GET') {
      options.body = isFormData ? request : JSON.stringify(request);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    console.log('API RESPONSE :: ', data);
    if (data.status === 401) {
      showToast({
        message: data?.message || 'Unauthorized',
        type: 'info',
      });
      resetToLogin();
      return;
    }
    if (data.status === 404) {
      showToast({
        message: data?.message || 'Something went wrong',
        type: 'info',
      });
      return false;
    }
  } catch (error: any) {
    console.log('API ERROR :::::: ', error);

    showToast({
      message: 'Network Errorxaxaasdasd',
      type: 'error',
    });
  }
};
export default RestApi;
