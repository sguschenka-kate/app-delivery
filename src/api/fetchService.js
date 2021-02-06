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
  const response = await fetch('http://95.217.218.239/api/auth/login', {
    method: "POST",
    body: query,
  })
  const data = await response.json();
  const user = data.data
  console.log(user, '---')

  return user
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