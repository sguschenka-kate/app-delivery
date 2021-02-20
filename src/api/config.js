const token = JSON.parse(localStorage.getItem('token'));

const config = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `Bearer ${token}`,
  }
};

export {
  config
}
