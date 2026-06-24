import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { productsRouter } from './routes/products.route.js';

const app = new Hono();

// rota global para teste
app.get('/', (c) => {
  return c.text('API rodando com sucesso.');
});

// vinculando o roteador de produtos à aplicação principal usando .route()
app.route('products', productsRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
