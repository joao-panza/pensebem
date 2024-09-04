import { Request, Response } from 'express';
import BookService from "../services/BookService";

class BookResolver {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public getBooks(_: Request, res: Response): void {
        const books = this.bookService.getListOfBooks();
        
        res.status(200).json(books);
    }

    public getBookById(req: Request<{ id: number }>, res: Response): void {
        const { id } = req.params;

        const book = this.bookService.getBookById(id);
    
        res.status(200).json(book);
    }
}

export default new BookResolver();