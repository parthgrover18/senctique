export enum Gender {
    Men = "Men",
    Women = "Women",
    Unisex = "Unisex"
}

export enum Category {
    Men = "Men",
    Women = "Women",
    Unisex = "Unisex",
    Luxury = "Luxury",
}

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    topNotes: string;
    middleNotes: string;
    baseNotes: string;
    concentration: string;
    longevity: string;
    size: string;
    rating: number;
    description: string;
    sillage: string;
    fragranceType: string;
    usage: string;
    packaging: string;
    ingredients: string;
    gender: Gender;
    category: Category;
    stock: number;
}

export interface ProductListProps {
    category?: Category[];
    gender?: Gender[];
}


