import { reduceToDictionary } from "../lib/reduceToDictionary";
import { request } from './request';

async function fetchProducts() {
  const response = await fetch("http://95.217.218.239/api/product", {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return reduceToDictionary(arr)
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
  const url = request({
    url: '/product',
    search: value,
  })
  const response = await fetch(url, {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data
  return arr
}

const fetchService = {
  fetchProducts,
  fetchProductsByCategory,
  searchData,
  fetchCategories,
};

export {
  fetchService
}