import { Hono } from 'hono';

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

// instanciando o Hono especificamente para este arquivo
// chamamos de 'productsRouter' para deixar claro que ele cuida apenas de produtos
const productsRouter = new Hono();

productsRouter.get('/', (c) => {
  return c.json(products);
});

productsRouter.get('/:id', (c) => {
  const { id } = c.req.param();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return c.json({ message: 'Produto não encontrado' }, 404);
  }

  return c.json(product);
});

productsRouter.post('/', async (c) => {
  // passamos o DTO como a tipagem esperada do corpo da requisição
  const body = await c.req.json<CreateProductDTO>();

  if (!body.name || !body.price) {
    return c.json({ error: 'Nome e preço são obrigatórios' }, 400);
  }

  const newProduct: Product = {
    id: (products.length + 1).toString(),
    name: body.name,
    price: body.price,
  };

  products.push(newProduct);
  return c.json(newProduct, 201);
});

// exportando o roteador para o arquivo principal usá-lo
export { productsRouter };
