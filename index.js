const request = require("request");
const fs = require("fs");
const prompt = require("prompt");
prompt.start();
// // Get search input from the user: search query
prompt.get(["search query"], function (err, result) {
  console.log("Command-line input received:", result["search query"]);
});
const args = process.argv.slice(2);
// fetching the API
const options = {
  url: `https://icanhazdadjoke.com/search?term=${args}`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "utf-8",
  },
};
request.get(options, function (err, res, body) {
  let data = JSON.parse(body);

  fs.writeFile("jokes.txt", JSON.stringify(data), function (err) {
    if (err) {
      console.log(err, "No joke was found for that search term");
    }
  });
  console.log(data);
  //   return data;
});
