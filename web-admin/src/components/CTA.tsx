export default function CTA() {
  return (
    <section className="w-full bg-gradient-to-r from-orange-600 to-amber-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        <h3 className="text-3xl font-display font-semibold mb-3">
          Comece a vender hoje mesmo
        </h3>
        <p className="text-white/90">
          Cadastre sua padaria em menos de 5 minutos e comece a receber pedidos de clientes da sua região.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-orange-700 hover:bg-white/90"
          >
            Cadastrar minha padaria →
          </a>
        </div>
      </div>
    </section>
  );
}
