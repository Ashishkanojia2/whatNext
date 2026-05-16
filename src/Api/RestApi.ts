// import { resetToLogin } from '../helper/NavigationHelper';
// import showToast from '../utils/showToast';
// import { BASE_URL } from './Global';

import { resetToLogin } from '../helper/NavigationHelper';
import showToast from '../utils/showToast';
import { BASE_URL } from './Global';

type RestApiProps = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  endpoint: string;
  request?: any;
  headers?: any;
};

// const RestApi = async ({
//   method = 'GET',
//   endpoint,
//   request,
//   headers = {},
// }: RestApiProps) => {
//   try {
//     const options: any = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//     };

//     if (method !== 'GET') {
//       options.body = JSON.stringify(request);
//     }

//     const response = await fetch(`${BASE_URL}${endpoint}`, options);

//     // response body parse
//     console.log("Endpoint: ", endpoint);
//     const data = await response.json();

//     console.log('API RESPONSE :: ', data);

//     // success
//     if (response.ok) {
//       return data;
//     }

//     // error handling
//     if (response.status === 401) {
//       showToast({
//         message: data?.message || 'Unauthorized',
//         type: 'info',
//       });
//       resetToLogin();
//       console.log('Hello!1234567890', response);
//       return;
//     } else if (response.status === 404) {
//       showToast({
//         message: data?.message || 'API Not Found',
//         type: 'error',
//       });
//     } else if (response.status === 500) {
//       showToast({
//         message: data?.message || 'Server Error',
//         type: 'error',
//       });
//     } else {
//       showToast({
//         message: data?.message || 'Something went wrong',
//         type: 'error',
//       });
//     }

//     return data;
//   } catch (error: any) {
//     console.log('API ERROR :::::: ', error);

//     showToast({
//       message: error?.message || 'Network Error',
//       type: 'error',
//     });
//   }
// };

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

    console.log('Endpoint: ', endpoint);

    const data = await response.json();

    console.log('API RESPONSE :: ', data);

    if (response.ok) {
      return data;
    }

    if (response.status === 401) {
      showToast({
        message: data?.message || 'Unauthorized',
        type: 'info',
      });

      resetToLogin();

      return;
    }

    showToast({
      message: data?.message || 'Something went wrong',
      type: 'error',
    });

    return data;
  } catch (error: any) {
    console.log('API ERROR :::::: ', error);

    showToast({
      message: error?.message || 'Network Error',
      type: 'error',
    });
  }
};
export default RestApi;
