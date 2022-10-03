const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/rewards', require('./routes/rewards'));

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
