const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // Add this line to parse JSON in the request body

app.post('/', async function (req, res, next) {
  try {
    // Use Promise.all to await all promises concurrently
    let results = await Promise.all(req.body.developers.map(async d => {
      let response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data;
    }));

    let out = results.map(r => ({ name: r.name, bio: r.bio }));

    return res.send(JSON.stringify(out));
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
