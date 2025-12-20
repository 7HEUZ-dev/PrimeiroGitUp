import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-zinc-700">
          © 2024 PãoQuentinho. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-6 text-zinc-700">
          <Link href="#" className="hover:text-black">Termos</Link>
          <Link href="#" className="hover:text-black">Privacidade</Link>
          <Link href="#" className="hover:text-black">Suporte</Link>
        </div>
      </div>
    </footer>
  );
}
