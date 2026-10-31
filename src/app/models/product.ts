export class Product {
  id: number;
  img_url: string;
  price: number;
  discount: number;
  category: string;
  translationKey: string;
  discountedPrice?: number;
}