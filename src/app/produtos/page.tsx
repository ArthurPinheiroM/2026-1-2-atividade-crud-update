import Link from 'next/link';

interface Produto {
  id: number;
  title: string;
  price: number;
}

export default async function ProdutosPage() {
  // Consumindo os dados da API conforme o enunciado
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const produtos: Produto[] = data.products;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Produtos</h1>
      
      <div className="grid gap-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">{produto.title}</p>
              <p className="text-gray-500">R$ {produto.price}</p>
            </div>
            
            {/* Link para o próximo passo (detalhes/edição) */}
            <Link 
              href={`/produtos/${produto.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}