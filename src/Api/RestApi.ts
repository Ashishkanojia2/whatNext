// const BaseUrl = 'https://fakestoreapi.com/';
// type RestApiProps = {
//   method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
//   endpoint: string;
//   request?: any;
//   header?: any;
// };

// const RestApi = async ({
//   method = 'GET',
//   endpoint,
//   request = {},
//   header,
// }: RestApiProps) => {
//   try {
//     const response = await fetch(`${BaseUrl}${endpoint}`, {
//       method: method,
//       body: JSON.stringify(request),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     await response.json()

//   } catch (error) {
//     console.log('API CATCH ERROR :::::: ', error);
//   }
// };
// export default RestApi

const BaseUrl = 'https://fakestoreapi.com/';

type RestApiProps = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  endpoint: string;
  request?: any;
  header?: any;
};

const RestApi = async ({
  method = 'GET',
  endpoint,
  request,
  header = {},
}: RestApiProps) => {
  try {
    const options: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
    };

    // only attach body if not GET
    if (method !== 'GET') {
      options.body = JSON.stringify(request);
    }

    const response = await fetch(`${BaseUrl}${endpoint}`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log('API ERROR :::::: ', error);
  }
};

export default RestApi;
