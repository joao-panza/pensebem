/**
 * @class BookResolver
 * @description Classe responsável por resolver as requisições HTTP relacionadas aos livros.
 */
import { Request, Response } from 'express';
import { Controller, Injectable } from '../decorators';
import { BookInputType } from '../interfaces';
import { ResponseErrorService, BookService } from '../services';

@Injectable()
@Controller("/books")
export default class BookResolver {
    /**
     * @constructor
     * @description Inicializa uma nova instância de BookResolver.
     * @param {BookService} bookService - Serviço responsável pela lógica de negócios dos livros.
     * @param {ResponseErrorService} responseErrorService - Serviço responsável por gerar mensagens de erro padronizadas.
     */
    constructor(
        private bookService: BookService,
        private responseErrorService: ResponseErrorService
    ) { }

    /**
     * @method getBooks
     * @description Manipula a requisição para obter a lista de livros.
     * @param {Request} _ - Objeto de requisição HTTP.
     * @param {Response} res - Objeto de resposta HTTP.
     * @returns {void}
     */
    public getBooks(_: Request, res: Response): void {
        const books = this.bookService.getListOfBooks();
        res.status(200).json(books);
    }

    /**
     * @method getBookById
     * @description Manipula a requisição para obter um livro pelo ID.
     * @param {Request<BookInputType>} req - Objeto de requisição HTTP contendo o ID do livro.
     * @param {Response} res - Objeto de resposta HTTP.
     * @returns {void}
     */
    public getBookById(req: Request<BookInputType>, res: Response): void {
        try {
            const { id } = req.params;
            const book = this.bookService.getBookById(Number(id));

            if (!book) {
                res.status(404).json(this.responseErrorService.getBookNotFoundMessage());
            } else {
                res.status(200).json(book);
            }
        } catch (error) {
            res.status(500).json(this.responseErrorService.getInternalServerErrorMessage());
        }
    }
}
