import { IRecebimento } from "../recebimento/recebimento.interface";

export interface IVenda {
    id: number;
    idPessoa: number;
    pessoa: string;
    idUsuarioLancamento: number;
    valorTotal: number;
    dataHora: Date;
    pago: boolean;
    baixa: IRecebimento[];
}
