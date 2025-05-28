export default interface OrderType {
  id: number;
  status: string;
  createdAt: string;
  product: {
    name: string;
    price: { amount: number; currency: string };
  };
  customer: {
    name: string;
    email: string;
    img_url: string; // Optional, in case some customers don't have an avatar
  };
}
