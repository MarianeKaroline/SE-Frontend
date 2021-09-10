import { StatusProduct } from './../../../static_data/status-product.enum';

export interface ProductsMemoryModel {
  productId: number,
  amount: number,
  statusProductEnum: StatusProduct
}
