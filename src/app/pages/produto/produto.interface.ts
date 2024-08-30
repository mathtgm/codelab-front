export interface IProduto {
    id: number;
    descricao: string;
    precoCusto: number;
    precoVenda: number;
    imagem: string;
    ativo: boolean;
    codigoBarras: string[];
}
