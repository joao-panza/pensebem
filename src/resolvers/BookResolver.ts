import { Request, Response } from 'express';
import { Injectable } from '../decorators';
import { BookInputModel } from '../models/BookInputModel';
import BookService from "../services/BookService";

@Injectable()
export default class BookResolver {
    constructor(private bookService: BookService) { }

    public getBooks(_: Request, res: Response): void {
        const books = this.bookService.getListOfBooks();
        
        res.status(200).json(books);
    }

    public getBookById(req: Request, res: Response): void {
        const { id } = req.params as unknown as BookInputModel;

        const book = this.bookService.getBookById(id);
    
        res.status(200).json(book);
    }
}
