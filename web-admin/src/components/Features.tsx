import {
  ShoppingOutlined,
  AreaChartOutlined,
  CreditCardOutlined,
  CarOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";

const features = [
  {
    icon: <ShoppingOutlined />,
    title: "Gestão Completa",
    desc: "Dashboard intuitivo com controle total sobre pedidos, produtos e finanças.",
  },
  {
    icon: <AreaChartOutlined />,
    title: "Relatórios Inteligentes",
    desc: "Analytics avançado para tomar decisões baseadas em dados reais.",
  },
  {
    icon: <CreditCardOutlined />,
    title: "Pagamentos Integrados",
    desc: "PIX, cartões e carteiras digitais com split automático de pagamentos.",
  },
  {
    icon: <CarOutlined />,
    title: "Entregas Otimizadas",
    desc: "Rastreamento em tempo real e gestão inteligente de entregadores.",
  },
  {
    icon: <StarOutlined />,
    title: "Avaliações e Fidelidade",
    desc: "Sistema de avaliações e programa de fidelidade para seus clientes.",
  },
  {
    icon: <UserOutlined />,
    title: "Base de Clientes",
    desc: "CRM integrado para conhecer e se comunicar com seus clientes.",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-amber-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-zinc-900">
            Tudo que sua padaria precisa
          </h2>
          <p className="text-zinc-600">
            Uma plataforma completa para gerenciar vendas, entregas e finanças em um só lugar.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-600 grid place-items-center mb-4">
                {f.icon}
              </div>
              <div className="text-lg font-semibold">{f.title}</div>
              <div className="text-sm text-zinc-600 mt-2">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
