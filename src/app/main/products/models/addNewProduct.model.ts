import { CategoryEnum } from "src/app/static_data/category.enum";

export interface AddNewProductModel {
  name: string;
  price: number;
  detail: string;
  amount: number;
  categoryId: CategoryEnum;
  ranking: number;
  available: boolean;
  rating: number;
  image: string;
}
