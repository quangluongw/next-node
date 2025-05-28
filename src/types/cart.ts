export interface Cart {
  productid: string;
  quantity: number;
}
export interface CartItem {
  _id: string;
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
  
  totalPrice: string;
  quantity: number;
}

