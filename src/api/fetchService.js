import { convert } from "../lib/convert";

async function fetchProducts() {
  const response = await fetch("http://95.217.218.239/api/product", {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return convert(arr)
}

async function fetchCategories() {
  const response = await fetch("http://95.217.218.239/api/category", {
    method: "GET",
  })
  const data = await response.json();
  const arr = data.data;

  return convert(arr)
}

const fetchService = {
  fetchProducts,
  fetchCategories,
};

export {
  fetchService
}