import { reduceToDictionary } from "../lib/reduceToDictionary";
import axios from 'axios';

async function fetchProducts() {
  const response = await axios.get('http://easytour.club/api/product/')
  const arr = response.data.data;

  return reduceToDictionary(arr)
}

async function fetchProduct(id = null) {
  const response = await axios.get(`http://easytour.club/api/product/${id}`)
  const product = response.data.data;

  return product
}

async function fetchProductsByCategory(id) {
  const query = { category_id: id };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key])
  // }

  const response = await axios.get('http://easytour.club/api/product', {
    params: query
  })
  const arr = response.data.data;

  return reduceToDictionary(arr)
}

async function fetchCategories() {
  const response = await axios.get('http://easytour.club/api/category')
  const arr = response.data.data
  return reduceToDictionary(arr)
}

async function searchData(value) {
  const query = { search: value };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key]);
  // }

  const response = await axios.get('http://easytour.club/api/product', {
    params: query,
  })
  const arr = response.data.data
  return reduceToDictionary(arr)
}

const fetchService = {
  fetchProducts,
  fetchProduct,
  fetchProductsByCategory,
  searchData,
  fetchCategories,
};

export {
  fetchService
}