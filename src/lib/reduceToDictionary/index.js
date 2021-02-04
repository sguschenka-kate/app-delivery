function reduceToDictionary(arr) {
  return arr.reduce((acc, current) => ({
    ...acc,
    [current.id]: current
  }), {});
}

export {
  reduceToDictionary
}