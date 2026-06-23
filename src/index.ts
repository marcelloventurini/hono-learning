import { serve } from '@hono/node-server';
import { Hono } from 'hono';

// instanciando o Hono
const app = new Hono();

// definindo uma rota GET para a raiz do aplicativo
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
