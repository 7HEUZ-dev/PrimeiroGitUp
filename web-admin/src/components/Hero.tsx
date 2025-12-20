import Link from "next/link";
import { StarFilled, ThunderboltOutlined } from "@ant-design/icons";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
            <ThunderboltOutlined />
            <span>Novo: Integração com PIX automático</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight text-zinc-900">
            O sabor do seu pão{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              direto na sua casa
            </span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-xl">
            A plataforma completa para padarias venderem online e clientes descobrirem
            o melhor pão fresquinho do bairro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pedir"
              className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600"
            >
              Pedir agora →
            </Link>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-zinc-900 border border-zinc-200 hover:bg-zinc-50"
            >
              Sou dono de padaria
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 text-orange-700">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-orange-800/70">Padarias ativas</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50k+/mês</div>
              <div className="text-sm text-orange-800/70">Pedidos/mês</div>
            </div>
            <div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-orange-800/70">Satisfação</div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$2M+</div>
              <div className="text-sm text-orange-800/70">Transacionados</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
            alt="Pães frescos"
            className="w-full rounded-3xl shadow-xl"
          />
          <div className="absolute -top-4 right-6 bg-white rounded-xl shadow-md px-4 py-2 flex items-center gap-2">
            <StarFilled className="text-yellow-400" />
            <span className="font-semibold">4.9</span>
            <span className="text-zinc-500">(2.4k)</span>
          </div>
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-orange-100 grid place-items-center text-orange-600">
              <ThunderboltOutlined />
            </div>
            <div>
              <div className="font-medium">Entrega rápida</div>
              <div className="text-sm text-zinc-500">15–30 min no seu bairro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
