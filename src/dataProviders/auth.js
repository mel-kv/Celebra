import axios from 'axios';

export async function loginUser(data) {
  try {
    const res = await axios.post('https://dummyjson.com/auth/login', data);
    return res.data;
  }
  catch (error) {
    console.error('Wrong username or password', error);
    return null;
  }
}

// username: 'kminchelle'
// password: '0lelplR'
