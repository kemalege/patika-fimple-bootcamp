import getData from "./getData.js";

// This code block fetches user data using the getData function and logs it to the console.
(async () => {
  try {
    const userData = await getData(1);
    console.log(userData);
  } catch (err) {
    console.error(err);
  }
})();
