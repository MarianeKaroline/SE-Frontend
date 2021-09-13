import { CategoryEnum } from "../../../static_data/category.enum";

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
