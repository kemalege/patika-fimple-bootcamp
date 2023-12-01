import getData from "./getData.js";

(async () => {
  try {
    const userData = await getData(1);
    console.log(userData);
  } catch (err) {
    console.error(err);
  }
})();
