import { axiosApiInstance } from "./axiosApiInstance";
import { reduceToDictionary } from "../lib/reduceToDictionary";

async function fetchProducts() {
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/product/`
  );
  const arr = response.data.data;

  return reduceToDictionary(arr);
}

async function fetchProduct(id = null) {
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/product/${id}`
  );
  const product = response.data.data;

  return product;
}

async function fetchProductsByCategory(id) {
  const query = { category_id: id };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key])
  // }
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/product/`,
    {
      params: query,
    }
  );
  const arr = response.data.data;

  return reduceToDictionary(arr);
}

async function fetchCategories() {
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/category/`
  );
  const arr = response.data.data;
  return reduceToDictionary(arr);
}

async function searchData(value) {
  const query = { search: value };

  // for (const key in query) {
  //   url.searchParams.set(key, query[key]);
  // }

  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/product`,
    {
      params: query,
    }
  );
  const arr = response.data.data;
  return reduceToDictionary(arr);
}

async function verifyUser(user) {
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/auth/login`,
    {
      params: user,
    }
  );
  const arr = response.data.data;
  return arr;
}

async function editUser(data) {
  const response = await axiosApiInstance.post(
    `https://ponchik.app/api/user/update`,
    data
  );
  const arr = response.data.data;
  return arr;
}

async function makeOrder(order, amount) {
  const data = Object.values(order);
  const response = await axiosApiInstance.post(
    `https://ponchik.app/api/order/store`,
    {
      data,
      amount,
    }
  );
  const arr = response.data.data;
  return arr;
}

async function fetchOrders() {
  const response = await axiosApiInstance.get(`https://ponchik.app/api/order`);
  const arr = response.data.data;
  return arr;
}

async function fetchOrder(id) {
  const response = await axiosApiInstance.get(
    `https://ponchik.app/api/order/${id}`
  );
  const arr = response.data.data;
  return arr;
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
  fetchOrder,
};

export { fetchService };
