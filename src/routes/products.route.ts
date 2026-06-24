import { Hono } from "hono";

// entidade - como o produto é representado no sistema/banco de dados
interface Product {
  id: string;
  name: string;
  price: number;
}

// DTO - representa exatamente os dados que esperamos receber do cliente na criação
interface CreateProductDTO {
  name: string;
  price: number;
}

// banco fake
const products: Product[] = [
  { id: '1', name: 'Teclado', price: 350 },
  { id: '2', name: 'Mouse', price: 200 },
];

const productsRouter = new Hono();

productsRouter.get('/', (c) => {
  return c.json(products);
})

export { productsRouter };
