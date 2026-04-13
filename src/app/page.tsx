import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Atividade CRUD 2026
        </h1>
        <p className="text-slate-500 text-lg">
        </p>
        
        {/* Link para a página de produtos */}
        <Link 
          href="/produtos" 
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-8 py-3 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
        >
          Ir para Lista de Produtos
        </Link>
      </div>
    </main>
  );
}