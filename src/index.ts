import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { productsRouter } from './routes/products.route.js';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono();

// aplicando os middlewares globalmente usando o método .use() do Hono
app.use('*', logger());
app.use('*', cors());

// middleware customizado
app.use('*', async (c, next) => {
  console.log('-> passou pelo middleware customizado antes da rota');

  // o next() informa ao Hono que ele deve continuar para a próxima rota ou middleware
  await next();

  console.log('-> voltou para o middleware customizado depois que a rota respondeu');

  // modificando a resposta adicionando um cabeçalho personalizado
  c.res.headers.append('X-Criado-Por', 'Marcello');
});

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
