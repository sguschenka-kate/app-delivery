import { reduceToDictionary } from "../lib/reduceToDictionary";
// import { request } from './request';

async function fetchProducts() {
  const response = await fetch('http://95.217.218.239/api/product/', {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return reduceToDictionary(arr)
}

async function fetchProduct(id = null) {
  const response = await fetch(`http://95.217.218.239/api/product/${id}`, {
    method: "GET",
  })
  const data = await response.json();
  const product = data.data;

  return product
}

async function fetchProductsByCategory(id) {
  const query = { category_id: id };
  const url = new URL('http://95.217.218.239/api/product');

  for (const key in query) {
    url.searchParams.set(key, query[key])
  }

  const response = await fetch(url.href, {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return reduceToDictionary(arr)
}

async function fetchCategories() {
  const response = await fetch("http://95.217.218.239/api/category", {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return reduceToDictionary(arr)
}

async function searchData(value) {
  const query = { search: value };
  const url = new URL('http://95.217.218.239/api/product');

  for (const key in query) {
    url.searchParams.set(key, query[key]);
  }

  const response = await fetch(url.href, {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data
  return reduceToDictionary(arr)
}

async function verifyUser(query) {

  const url = new URL('https://vkurse.today/api/auth/login');


  const response = await fetch(url.href, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(query) // body data type must match "Content-Type" header
  })
  const data = await response.json();

  return data.data
}



const fetchService = {
  fetchProducts,
  fetchProduct,
  fetchProductsByCategory,
  searchData,
  fetchCategories,
  verifyUser,
};

export {
  fetchService
}