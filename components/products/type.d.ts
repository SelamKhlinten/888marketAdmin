export default interface ProductTypes {
  id: number;
  name: string;
  description: string;
  price: {
    currency: string;
    amount: number;
  };
  stock: number;
  imgUrls: string[];
  category: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
}
