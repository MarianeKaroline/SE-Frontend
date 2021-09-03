import { CategoryEnum } from "../../enums/categoryEnum";

export interface CategoryModel {
    productId: number;
    name: string;
    price: number;
    category: {
        categoryEnum: CategoryEnum,
        description: string
    };
    available: boolean;
    image: string;
}
