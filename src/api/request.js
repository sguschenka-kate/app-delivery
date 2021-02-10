// import { reduceToDictionary } from '../lib/reduceToDictionary';

const request = async (config) => {
  const body = config.body ? JSON.stringify(config.body) : undefined;
  const { url, query } = config;
  const uri = new URL(`http://95.217.218.239/api${url}`);

  for (const key in query) {
    uri.searchParams.set(key, query[key]);
  }

  const response = await fetch(uri.href, {
    body,
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers || {}
    }
  });

  const data = await response.json();
  return data;
}

export {
  request
}