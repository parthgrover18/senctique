import {Product} from "./Product.tsx";

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
    total: number;
    product: Product;
}

export interface OrderData {
    id: number
    total: number;
    status: string;
    orderItems: OrderItem[];

}





