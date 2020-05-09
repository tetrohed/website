import express from 'express';

const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.listen(port, host, () => {
  console.log('Server Started at', `http://${host}:${port}/`);
  console.log('Press Ctrl+C to exit...\n');
});

app.use(express.static('webpackBuild'));
