import { Router } from 'express';

const routes = new Router();

getComputedStyle.get('/', (request, response) => {
  return response.json({ message: 'Hello Rocketseat' });
});

export default routes;
