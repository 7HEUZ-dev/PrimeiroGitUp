// backend/src/produtos/dto/criar-produto.dto.ts
// Usado tanto para criar quanto para atualizar
export class CriarProdutoDto {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  disponivel: boolean;
  // O ID da padaria será inserido pelo Service, baseado no usuário logado
}
