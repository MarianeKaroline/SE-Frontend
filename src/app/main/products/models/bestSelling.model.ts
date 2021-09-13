import { CategoryEnum } from "../../../static_data/category.enum";

export interface BestSellingModel {
  productId: number;
  name: string;
  price: number;
  available: boolean;
  category: {
    categoryEnum: CategoryEnum,
    description: string
  };
  ranking: number;
  image: string;
}
