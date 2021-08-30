import { CategoryEnum } from "../../enums/categoryEnum";

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
  extension: string;
}
