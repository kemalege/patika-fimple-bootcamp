import axios from "axios";

async function getData(userId) {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);
    const combinedData = {
      ...userResponse.data,
      posts: postsResponse.data,
    };
    return combinedData;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

export default fetchData;
