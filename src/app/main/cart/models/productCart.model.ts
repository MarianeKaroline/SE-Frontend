import { CategoryEnum } from './../../enums/categoryEnum';
export interface ProductCartModel {
  productId: number;
  name: string;
  category: {
    categoryEnum: CategoryEnum,
    description: string
  },
  amount: number;
  statusId: number;
  price: number;
  image: string;
  extension: string;
}
