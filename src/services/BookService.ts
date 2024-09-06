/**
 * @class BookService
 * @description Classe responsável pela lógica de negócios relacionada aos livros.
 */
import { Injectable } from "../decorators";
import { BookObjectType, ListBooksObjectType } from "../interfaces";
import { BookError } from "../exceptions";
import { BookRepository } from "../repositories";

@Injectable()
export class BookService {
    /**
     * @constructor
     * @description Inicializa uma nova instância de BookService.
     * @param {BookRepository} bookRepository - Repositório responsável pela leitura dos dados dos livros.
     */
    constructor(private bookRepository: BookRepository) { }

    /**
     * @method getListOfBooks
     * @description Retorna uma lista de objetos contendo as informações básicas dos livros.
     * @returns {ListBooksObjectType[]} Lista de objetos com id, título e descrição dos livros.
     */
    public getListOfBooks(): ListBooksObjectType[] {
        return this.bookRepository.getBooks().map(book => ({
            id: book.id,
            title: book.title,
            description: book.description
        }));
    }

    /**
     * @method getBookById
     * @description Retorna um livro pelo ID.
     * @param {number} id - ID do livro.
     * @returns {BookObjectType} Instância do livro.
     * @throws {BookError} Se o livro não for encontrado.
     */
    public getBookById(id: number): BookObjectType {
        const book = this.bookRepository.getBookById(id);

        if (!book) {
            throw new BookError("O livro requisitado não pode ser encontrado");
        }

        return book;
    }
}
