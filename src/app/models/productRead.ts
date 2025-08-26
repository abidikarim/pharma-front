import { ProductCreate } from "./productCreate";

export interface ProductRead extends ProductCreate {
    id: number;
}