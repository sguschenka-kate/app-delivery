const request = async (url, query) => {
  const uri = new URL(`http://95.217.218.239/api${url}`);

  for (const key in query) {
    uri.searchParams.set(key, query[key])
  }
  console.log(uri)

  return uri
}

export {
  request
}