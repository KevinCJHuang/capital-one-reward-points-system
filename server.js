const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/reward', require('./routes/reward'));

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Api listening on port ${PORT}`);
});

module.exports = app;
