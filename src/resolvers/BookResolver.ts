/**
 * @class BookResolver
 * @description Classe responsável por resolver as requisições HTTP relacionadas aos livros.
 */
import { NextFunction, Request, Response } from 'express';
import { Controller, Injectable, Route } from '../decorators';
import { BookInputType, ListBooksObjectType, ListProgramsObjectType } from '../interfaces';
import { BookService } from '../services';

@Injectable()
@Controller()
export default class BookResolver {
    constructor(private bookService: BookService) { }

    @Route("/book/list", "get")
    public async getBooks(_: Request, res: Response, next: NextFunction): Promise<void> {
        this.bookService.getListOfBooks()
            .then((listOfBooks: ListBooksObjectType) => {
                res.status(200).json(listOfBooks);
            })
            .catch((error) => {
                next(error);
            });
    }

    @Route("/book/:id/program/list", "get")
    public async getBookPrograms(req: Request<BookInputType>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            this.bookService.getBookPrograms(id)
                .then((listOfPrograms: ListProgramsObjectType) => {
                    res.status(200).json(listOfPrograms);
                })
                .catch((error) => {
                    next(error);
                });
        } catch (error) {
            next(error);
        }
    }

    @Route("/validate", "post")
    public async validateProgram(req: Request<{bookId: string, programId: string, question: number, answer: string}>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { bookId, programId, question, answer } = req.body;

            this.bookService.validateProgram(bookId, programId, question, answer)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    next(error);
                });
        } catch (error) {
            next(error);
        }
    }

    @Route("/calculate", "get")
    public async calculate(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            this.bookService.calculate()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    next(error);
                });
        } catch (error) {
            next(error);
        }
    }
}
