import { BookModel } from "../models/BookModel";

export interface ListBooksObjectType {
    books: BookModel[];
    quantity: number;
}