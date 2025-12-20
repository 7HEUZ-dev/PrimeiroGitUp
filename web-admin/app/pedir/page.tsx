import { ShopOutlined, SettingOutlined } from "@ant-design/icons";
import PadariaCard, { Padaria } from "@/components/PadariaCard";

async function fetchPadarias() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${base}/padarias`, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar padarias");
  const data = await res.json();
  return data as Padaria[];
}

export default async function PedirPage({
  searchParams,
}: {
  searchParams: { q?: string; c?: string };
}) {
  const q = (searchParams.q ?? "").toLowerCase();
  const c = (searchParams.c ?? "").toLowerCase();
  const padarias = await fetchPadarias();

  const filtered = padarias.filter((p) =>
    [p.nome, p.endereco].some((v) => v?.toLowerCase().includes(q))
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-orange-100 text-orange-600 grid place-items-center">
              <ShopOutlined />
            </div>
            <span className="text-xl font-display font-semibold">PãoQuentinho</span>
          </div>
          <div className="text-sm text-zinc-600">Painel Admin</div>
        </div>

        <div className="flex gap-3">
          <form className="flex-1">
            <input
              name="q"
              defaultValue={q}
              placeholder="Buscar padaria ou produto..."
              className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
            />
          </form>
          <button className="h-12 w-12 rounded-xl border border-zinc-200 grid place-items-center text-zinc-700 hover:bg-zinc-50">
            <SettingOutlined />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {["Pães", "Doces", "Bolos", "Café", "Salgados", "Orgânicos"].map(
            (cat) => (
              <a
                key={cat}
                href={`/pedir?c=${encodeURIComponent(cat.toLowerCase())}`}
                className={`inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-zinc-800 ${
                  c === cat.toLowerCase() ? "ring-2 ring-orange-400" : ""
                }`}
              >
                {cat}
              </a>
            )
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="font-display text-xl">Padarias próximas</div>
          <div className="text-sm text-zinc-600">{filtered.length} encontradas</div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PadariaCard
              key={p.id}
              padaria={p}
              tags={["Pães artesanais", "Croissant", "Café"]}
              distanciaKm={0.8}
              tempoMin="15–25 min"
              frete="Frete R$ 5,00"
              rating={4.8}
              reviews={p.entregasNoMes ?? 234}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
