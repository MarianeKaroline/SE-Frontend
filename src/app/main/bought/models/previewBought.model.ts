import { ProductCartModel } from './../../cart/models/productCart.model';

export interface PreviewBoughtModel {
  fullName: string;
  street: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  numberCard: string;
  code: string;
  pix: string;
  method: number
  itens: ProductCartModel[];
}
