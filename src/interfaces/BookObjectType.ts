import { BookModel } from "../models/BookModels";

export class ListBooksObjectType {
    constructor(
        public id: number,
        public title: string,
        public description: string
    ) {}
}

export class BookObjectType extends BookModel {}