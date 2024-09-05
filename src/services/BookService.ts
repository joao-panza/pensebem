import { BookModel } from "../models/BookModels";
import { BookNamesType, BookRepository } from "../repositories/BookRepository";
import { Injectable } from "../decorators";

@Injectable()
export default class BookService {
    constructor(private bookRepository: BookRepository) { }

    public getListOfBooks(): BookNamesType {
        return this.bookRepository.getBooks();
    }

    public getBookById(id: number): BookModel {
        return {} as BookModel;
    }
}