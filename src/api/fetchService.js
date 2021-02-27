import { reduceToDictionary } from "../lib/reduceToDictionary";
import axios from 'axios';
import { config } from './config';

async function fetchProducts() {
  const response = await axios.get('https://ponchik.app/api/product/', config)
  const arr = response.data.data;

  return reduceToDictionary(arr)
}

async function fetchProduct(id = null) {
  const response = await axios.get(`https://ponchik.app/api/product/${id}`, config)
  const product = response.data.data;

  return product
}

async function fetchProductsByCategory(id) {
  const query = { category_id: id };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key])
  // }
  const response = await axios.get('https://ponchik.app/api/product/', {
    params: query,
    headers: config.headers
  })
  const arr = response.data.data;

  return reduceToDictionary(arr)
}

async function fetchCategories() {
  const response = await axios.get('https://ponchik.app/api/category/', config)
  const arr = response.data.data
  console.log(arr)
  return reduceToDictionary(arr)
}

async function searchData(value) {
  const query = { search: value };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key]);
  // }

  const response = await axios.get('https://ponchik.app/api/product', {
    params: query,
    headers: config.headers
  })
  const arr = response.data.data
  return reduceToDictionary(arr)
}

async function verifyUser(user) {
  const response = await axios.get('https://ponchik.app/api/auth/login', {
    params: user,
  })
  const arr = response.data.data
  console.log(arr)
  return arr
}

async function editUser(data) {
  const response = await axios.post('https://ponchik.app/api/user/update', data, config)
  const arr = response.data.data
  return arr
}

async function makeOrder(order, amount) {
  const data = Object.values(order);
  const response = await axios.post('https://ponchik.app/api/order/store', {
    data,
    amount
  }, config)
  const arr = response.data.data
  return arr
}

async function fetchOrders() {
  const response = await axios.get('https://ponchik.app/api/order', config)
  const arr = response.data.data
  return arr
}

async function fetchOrder(id) {
  const response = await axios.get(`https://ponchik.app/api/order/${id}`, config)
  const arr = response.data.data;
  return arr
}

const fetchService = {
  fetchProducts,
  fetchProduct,
  fetchProductsByCategory,
  searchData,
  fetchCategories,
  verifyUser,
  editUser,
  makeOrder,
  fetchOrders,
  fetchOrder
};

export {
  fetchService
}