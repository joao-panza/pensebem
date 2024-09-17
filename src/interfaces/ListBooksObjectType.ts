import { BookModel } from "../models/BookModel";

export interface ListBooksObjectType {
    books: Omit<BookModel, "programs">[];
    quantity: number;
}