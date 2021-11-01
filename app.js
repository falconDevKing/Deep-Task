const express = require('express');

const config = require('./config');
const logicRoutes = require('./routes');

require('dotenv').config()

const app = express();

app.use(logicRoutes);

app.get('/', (req, res, next) => {
  res.send('Server Logger API');
});

app.use(((err, req, res, next) => {
  if (!err) {
    return next();
  }
  console.error(err.response?.data ?? err.message);
  res.error(500, 'Internal server error');
}));

const PORT = config.PORT;
console.log(config.NODE_ENV, config.WINDOW_TIME)

app.listen(PORT, () => {
  console.log(`Server Logger started on port ${PORT}`);
});