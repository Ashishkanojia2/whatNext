import { BASE_URL } from "./Global";
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
  console.log("endpoint======", endpoint);
  try {
    const options: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
    };
    if (method !== 'GET') {
      options.body = JSON.stringify(request);
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log('API ERROR :::::: ', error);
  }
};

export default RestApi;
