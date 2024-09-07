/**
 * @class BookResolver
 * @description Classe responsável por resolver as requisições HTTP relacionadas aos livros.
 */
import { NextFunction, Request, Response } from 'express';
import { Controller, Injectable, Route } from '../decorators';
import { BookInputType } from '../interfaces';
import { BookService } from '../services';

@Injectable()
@Controller()
export default class BookResolver {
    /**
     * @constructor
     * @description Inicializa uma nova instância de BookResolver.
     * @param {BookService} bookService - Serviço responsável pela lógica de negócios dos livros.
     */
    constructor(private bookService: BookService) { }

    /**
     * @method getBooks
     * @description Manipula a requisição para obter a lista de livros.
     * @param {Request} req - Objeto de requisição do Express.
     * @param {Response} res - Objeto de resposta do Express.
     * @param {NextFunction} next - Função para passar o controle para o próximo middleware.
     * @returns {Promise<void>} Uma promessa que resolve quando a operação estiver concluída.
     */
    @Route("/books", "get")
    public async getBooks(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const books = this.bookService.getListOfBooks();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method getBookById
     * @description Manipula a requisição para obter um livro pelo ID.
     * @param {Request} req - Objeto de requisição do Express.
     * @param {Response} res - Objeto de resposta do Express.
     * @param {NextFunction} next - Função para passar o controle para o próximo middleware.
     * @returns {Promise<void>} Uma promessa que resolve quando a operação estiver concluída.
     */
    @Route("/books/:id", "get")
    public async getBookById(req: Request<BookInputType>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const book = this.bookService.getBookById(Number(id));
                
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }
}
