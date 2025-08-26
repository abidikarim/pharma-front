import { CategoryCreate } from "./categoryCreate";
import { ProductRead } from "./productRead";

export interface CategoryRead extends CategoryCreate{
    id: number;
    image_link: string;
    products?: ProductRead[];
}