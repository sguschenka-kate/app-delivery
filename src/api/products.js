function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 2000)
  })
}

export {
  fetchProducts
}