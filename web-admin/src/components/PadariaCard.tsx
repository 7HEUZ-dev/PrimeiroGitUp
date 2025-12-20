import Link from "next/link";
import { EnvironmentOutlined, FieldTimeOutlined, CarOutlined, StarFilled } from "@ant-design/icons";

export interface Padaria {
  id: number;
  nome: string;
  endereco: string;
  ativo: boolean;
  entregasNoMes: number;
  plano: string;
}

export interface PadariaCardProps {
  padaria: Padaria;
  tags?: string[];
  distanciaKm?: number;
  tempoMin?: string;
  frete?: string;
  rating?: number;
  reviews?: number;
}

export default function PadariaCard({
  padaria,
  tags = [],
  distanciaKm = 0.8,
  tempoMin = "15–25 min",
  frete = "Frete R$ 5,00",
  rating = 4.8,
  reviews = 234,
}: PadariaCardProps) {
  return (
    <Link
      href={`/padaria/${padaria.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="relative h-40 w-full">
        <img
          src="https://images.unsplash.com/photo-1542683082-22c3f02eb3d6?q=80&w=1600&auto=format&fit=crop"
          alt={padaria.nome}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs rounded-md bg-orange-500 text-white px-2 py-1">
            {padaria.ativo ? "Aberto" : "Fechado"}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white rounded-lg px-2 py-1 text-sm shadow">
          <StarFilled className="text-yellow-400" />
          <span className="font-semibold">{rating.toFixed(1)}</span>
          <span className="text-zinc-500">({reviews})</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="text-lg font-semibold">{padaria.nome}</div>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-xs rounded-md bg-zinc-100 px-2 py-1 text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-1">
            <FieldTimeOutlined /> {tempoMin}
          </div>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined /> {distanciaKm} km
          </div>
          <div className="flex items-center gap-1">
            <CarOutlined /> {frete}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="text-right text-zinc-400 group-hover:text-zinc-600 transition">
          →
        </div>
      </div>
    </Link>
  );
}
