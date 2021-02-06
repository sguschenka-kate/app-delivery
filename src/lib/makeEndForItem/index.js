function makeEndForItem(item) {
  if (item === 1) {
    return 'Item';
  } else {
    return 'Items';
  }
}

export {
  makeEndForItem
}