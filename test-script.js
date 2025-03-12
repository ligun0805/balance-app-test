const axios = require("axios");

module.exports = makeRequests = async () => {
  const url = "http://localhost:5000/update-balance";
  // change requests number
  const numRequests = 20;
  const userId = "1";
  const amount = -2;

  const data = { userId, amount };
  let i = 0;

  const requests = Array.from({ length: numRequests }, () =>
    axios
      .post(url, data)
      .then((res) => {
        i++;
        console.log(i, res.data);
      })
      .catch((error) => {
        i++;
      })
  );
  try {
    await Promise.all(requests);
    console.log("All requests completed");
  } catch (error) {
    console.error("Error making requests:", error);
  }
};

makeRequests(); 

// task scheduling test
const checkTasks = async (port) => {
  const url = `http://localhost:${port}/tasks`;

  try {
    const response = await axios.get(url);
    console.log(`Tasks on port ${port}:`, response.data);
  } catch (error) {
    console.error(`Error fetching tasks from port ${port}:`, error);
  }
};

const testTaskScheduling = async () => {
  const ports = [5000, 5001, 5002, 5003, 5004];

  // Check tasks on each port
  for (const port of ports) {
    await checkTasks(port);
  }

  console.log("Task scheduling test completed");
};

testTaskScheduling();
