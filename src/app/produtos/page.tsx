import Link from 'next/link';

interface Produto {
  id: number;
  title: string;
  price: number;
  thumbnail: string; // Adicionando o campo da imagem
}

export default async function ProdutosPage() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const produtos: Produto[] = data.products;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">Nossa Vitrine</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {/* Renderizando a imagem do produto */}
            <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={produto.thumbnail} 
                alt={produto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold text-lg text-slate-900">{produto.title}</h2>
                <p className="text-green-600 font-bold">$ {produto.price}</p>
              </div>
            </div>
            
            <Link 
              href={`/produtos/${produto.id}`}
              className="block text-center bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              Editar Produto
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}