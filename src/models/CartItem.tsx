export interface CartItem {
    id: number;
    quantity: number;
    price: number;
    total: number;
    product: {
        id: number;
        name: string;
        brand: string;
        price: number;
        imageUrl: string;
        category: string;
    };
}