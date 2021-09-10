import { CategoryEnum } from "../../enums/categoryEnum";

export interface ListProductsModel {
  productId: number,
  name: string,
  price: number,
  amount: number,
  category: {
    categoryEnum: CategoryEnum,
    description: string
  },
  ranking: number,
  available: boolean,
  image: string
}
