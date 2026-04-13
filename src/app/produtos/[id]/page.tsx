import { redirect } from "next/navigation";

export default async function EditarProdutoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Busca os dados para preencher o formulário
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const produto = await res.json();

  // A Server Action definida aqui dentro
  async function handleUpdate(formData: FormData) {
    "use server"; // Certifique-se que isso está aqui!
    
    const title = formData.get("title");
    const price = formData.get("price");

    await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price }),
    });

    redirect("/produtos");
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Editar Produto #{id}</h1>
      
      <form action={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Produto</label>
          <input
            name="title"
            defaultValue={produto.title}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preço (US$)</label>
          <input
            name="price"
            type="number"
            defaultValue={produto.price}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar Alterações
          </button>
          <a 
            href="/produtos" 
            className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-md text-center hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}