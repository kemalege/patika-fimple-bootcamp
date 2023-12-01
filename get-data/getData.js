import axios from "axios";

// Function to fetch user data and posts data based on userId
async function getData(userId) {
  try {
    // Fetch user data and posts data concurrently using Promise.all
    const [userResponse, postsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    // Combine user data and posts data into a single object
    const combinedData = {
      ...userResponse.data,
      posts: postsResponse.data,
    };

    // Return the combined data
    return combinedData;
  } catch (err) {
    // Log and reject any errors that occur during the data fetching process
    console.error(err);
    return Promise.reject(err);
  }
}

export default fetchData;
