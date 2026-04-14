"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Pega o ID da URL (ex: /produtos/1)

  const [produto, setProduto] = useState<{ title: string; price: number } | null>(null);
  const [loading, setStatus] = useState(true);

  // 1. Busca os dados iniciais do produto para preencher o formulário
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
        setStatus(false);
      });
  }, [id]);

  // 2. Função que envia a atualização para a API (O núcleo do Passo 8)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const novoTitulo = formData.get("title");
    const novoPreco = formData.get("price");

    // O código da documentação da API que você enviou, aplicado aqui:
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT', /* Método de atualização solicitado */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: novoTitulo,
        price: Number(novoPreco) // Converte para número para a API aceitar
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Sucesso! Retorno da API:", data);
      alert("Mudanças enviadas com sucesso para a API!");
      
      // 3. Redireciona para a lista (Passo final do fluxo)
      router.push("/produtos");
      router.refresh();
    })
    .catch(err => {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao enviar mudanças.");
    });
  }

  if (loading) return <div className="p-10 text-center text-black">Carregando dados...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg mt-12 border border-slate-200">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Configurações do Produto</h1>
        <p className="text-slate-500 italic">Editando ID: #{id}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nome do Produto
          </label>
          <input
            name="title"
            defaultValue={produto?.title}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Ex: iPhone Galaxy +1"
            required
          />
        </div>

        {/* Campo Preço */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Preço (USD)
          </label>
          <input
            name="price"
            type="number"
            defaultValue={produto?.price}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transform active:scale-95 transition-all shadow-md"
          >
            Salvar Mudanças na API
          </button>
          
          <button
            type="button"
            onClick={() => router.push("/produtos")}
            className="w-full bg-slate-100 text-slate-600 font-medium py-3 rounded-xl hover:bg-slate-200 transition-all"
          >
            Cancelar e Voltar
          </button>
        </div>
      </form>

      <footer className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          As alterações feitas aqui utilizam o método <strong>PUT</strong> conforme a documentação da DummyJSON.
        </p>
      </footer>
    </div>
  );
}