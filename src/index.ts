import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Teclado', price: 350 },
  { id: '2', name: 'Mouse', price: 200 },
];

app.get('/products', (c) => {
  return c.json(products);
});

app.get('/products/:id', (c) => {
  const id = c.req.param('id');
  const product = products.find((p) => p.id === id);

  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post('/products', async (c) => {
  const body = await c.req.json<{ name: string; price: number }>();

  if (!body.name || !body.price) {
    return c.json({ message: 'Name and price are required' }, 400);
  }

  const newProduct: Product = {
    id: (products.length + 1).toString(),
    name: body.name,
    price: body.price,
  };

  products.push(newProduct);

  return c.json(newProduct, 201);
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
