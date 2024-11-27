export interface Order {
  id: string;
  address: string;
  dateOfCreation: string;
  status: string;
  productsSumPrice: number;
  deliveryFee: number;
  totalPrice: number;
}
