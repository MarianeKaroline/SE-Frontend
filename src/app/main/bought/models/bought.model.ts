import { StatusBought } from 'src/app/static_data/status-bought.enum';
import { ProductBoughtModel } from './product-bought.model';

export interface BoughtModel {
  boughtId: number;
  clientName: string;
  street: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  paymentMethod: number;
  numberCard: string;
  itens: ProductBoughtModel[];
  totalPrice: number;
  statusId: StatusBought;
  dateBought: Date;
}
