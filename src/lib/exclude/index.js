function exclude({ source, key }) {
  const { [key]: _, ...data } = source;
  return data
}

export {
  exclude
}