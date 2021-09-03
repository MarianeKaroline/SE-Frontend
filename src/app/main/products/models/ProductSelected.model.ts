import { CategoryEnum } from './../../enums/categoryEnum';

export interface ProductSelectedModel {
  productId: number;
  rating: number;
  name: string;
  category: {
    categoryEnum: CategoryEnum,
    description: string
  };
  price: number;
  amount: number;
  detail: string;
  image: string;
}
