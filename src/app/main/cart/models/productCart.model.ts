import { CategoryEnum } from '../../../static_data/category.enum';
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
}
