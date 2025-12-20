import Link from "next/link";
import { ShopOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-100 text-orange-600 grid place-items-center">
            <ShopOutlined />
          </div>
          <span className="text-xl font-display font-semibold">PãoQuentinho</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-zinc-700">
          <Link href="#" className="hover:text-black">Recursos</Link>
          <Link href="#" className="hover:text-black">Preços</Link>
          <Link href="#" className="hover:text-black">Contato</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="#" className="text-zinc-700 hover:text-black">Entrar</Link>
          <Link
            href="#"
            className="inline-flex h-10 items-center rounded-full bg-orange-500 px-4 text-white hover:bg-orange-600"
          >
            Área da Padaria
          </Link>
        </div>
      </div>
    </header>
  );
}
