const axios = require('axios');


module.exports = async () => {
  const url = "http://localhost:5000/update-balance";
  // change requests number
  const numRequests = 20;
  const userId = "1";
  const amount = -2;

  const data = { userId, amount };
  let i = 0;

  const requests = Array.from({ length: numRequests }, 
    () => axios.post(url, data)
      .then((res) => {
        i++;
        console.log(i, res.data); 
      })
      .catch((error) => {
        i++;
        console.log(i, error.response.data);
      }));
  try {
    await Promise.all(requests);
    console.log("All requests completed");
  } catch (error) {
    console.error("Error making requests:", error);
  }
}