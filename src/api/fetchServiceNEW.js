// import { axiosApiInstance } from "./axiosApiInstance";
import { reduceToDictionary } from "../lib/reduceToDictionary";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM1Njk0YWU1OTI1MGIwMDg3OGMxYTNmOWNhYTA5YTk3NjFjZDZjYTE2NDdlNDQwY2FkNTllNWE3NzU4ZDdkZWZhOWEzNmI3NTA1NTZkYWFkIn0.eyJhdWQiOiIxIiwianRpIjoiMzU2OTRhZTU5MjUwYjAwODc4YzFhM2Y5Y2FhMDlhOTc2MWNkNmNhMTY0N2U0NDBjYWQ1OWU1YTc3NThkN2RlZmE5YTM2Yjc1MDU1NmRhYWQiLCJpYXQiOjE2MTUyOTUxNzUsIm5iZiI6MTYxNTI5NTE3NSwiZXhwIjoxNjQ2ODMxMTc1LCJzdWIiOiI3OCIsInNjb3BlcyI6W119.fgblrsTTLsYemAkgfJaVZhavNjhLrAyKyNfwwA7QtCkcCh6wRCI37tVYM-_3dIUcx_vUVBf0iTb6gghuY1qg9kp0OqvRKqTlxhipQlMFU4MhxpPU_o8kXjZxX7tfxwHEkMh8ZkUHQO2lv47go2rzqiG-MIiS36i6VPaWKst1tkIavNmTRyk-ijLEsyZ8iEja-0RCBoxsO_58JyWBNu06FgcmCC7phJoQFU-lFE6BSAfQCz7MxtwkAgA6DZhhPBnxoJdmdenoeQt9Gd0EYd4LpdDIe916_L8gowciUlrppFhfI89SQoh4sKPizcMkQ70b3dyGsznKQesLq1tWNeFB0v_qXt57Vz5w-bV9A9D5NmmicwnpNaJJnlDCzVtx4k-jFcWyOqvWiwM8q7RuSkRRISaitckWHmW0OLBsPR2ev5pvcJVbhH3GF9ZL47PgcONXATgAwiyHFh_1AZi1XBtFQoRBO_dvra_Ut1s6ifHssytvW_FTEch5TrgutwGn1cTvG2CfD7oY7WQNy5DmVRfXZcioWFGeboSj4YJEoKrzbCGR7kAUFf7KljDckw_LTbQKVxiS4nLfWJXrtH9N218qxy5ngqBkOPQUrcSJoQ3GTbt3CeCU0JY_KjTmURISrC2L5yXC_n4_USGyignNRkcczw5Q1Az51g2AMN2uUD96Rr4";

async function fetchProducts() {
  const response = await fetch(`https://ponchik.app/api/product/`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const arr = response.data.data;

  return reduceToDictionary(arr);
}

async function fetchProduct(id = null) {
  const response = await fetch(`https://ponchik.app/api/product/${id}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const product = response.data.data;

  return product;
}

async function fetchProductsByCategory({ query }) {
  const uri = new URL(`https://ponchik.app/api/product/`);

  for (const key in query) {
    uri.searchParams.set(key, query[key]);
  }
  const response = await fetch(uri.href, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const arr = response.data.data;

  return reduceToDictionary(arr);
}

async function fetchCategories() {
  const response = await fetch(`https://ponchik.app/api/category/`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const arr = response.data.data;
  return reduceToDictionary(arr);
}

async function searchData(query) {
  const uri = new URL(`https://ponchik.app/api/product/`);

  for (const key in query) {
    uri.searchParams.set(key, query[key]);
  }

  const response = await fetch(uri.href, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const arr = response.data.data;
  return reduceToDictionary(arr);
}

async function verifyUser(query) {
  const uri = new URL(`http://easytour.club/api/autocomplete/terminals`);

  // for (const key in query) {
  //   uri.searchParams.set(key, query[key]);
  // }

  const response = await fetch(uri.href, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token,
    },
  });
  const arr = response.data.data;
  return arr;
}

async function editUser(data) {
  const response = await fetch(`https://ponchik.app/api/user/update`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: data,
  });
  const arr = response.data.data;
  return arr;
}

async function makeOrder(order, amount) {
  const data = Object.values(order);
  const response = await fetch(`https://ponchik.app/api/order/store`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: data,
    amount,
  });
  const arr = response.data.data;
  return arr;
}

async function fetchOrders() {
  const response = await fetch(`https://ponchik.app/api/order`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  const arr = response.data.data;
  return arr;
}

async function fetchOrder(query) {
  const uri = new URL("https://ponchik.app/api/order/");

  for (let key in query) {
    uri.searchParams.set(key, query[key]);
  }
  const response = await fetch(uri.href, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
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
