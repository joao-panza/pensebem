/**
 * @class BookRepository
 * @description Classe responsável por gerenciar a leitura de arquivos JSON contendo dados de livros.
 */
import fs from 'fs';
import path from 'path';
import { Injectable, Cache } from "../decorators";
import { BookModel } from '../models';

@Injectable()
export class BookRepository {
    /**
     * @method getBooks
     * @description Retorna uma lista de livros lidos dos arquivos JSON.
     * @returns {BookModel[]} Lista de livros.
     */
    public getBooks(): BookModel[] {
        return this.readJsonFiles();
    }

    /**
     * @method getBookById
     * @description Retorna um livro pelo ID.
     * @param {number} bookId - ID do livro.
     * @returns {BookModel | undefined} Instância do livro ou undefined se não encontrado.
     */
    public getBookById(bookId: number): BookModel | undefined {
        return this.getBooks().find((book: BookModel) => book.id === bookId);
    }

    /**
     * @method readJsonFiles
     * @description Lê os arquivos JSON do diretório de dados e os converte em instâncias de BookModel.
     * @returns {BookModel[]} Lista de livros.
     * @private
     */
    @Cache
    private readJsonFiles(): BookModel[] {
        const books: BookModel[] = [];
        const directory = path.join(__dirname, '..', 'data');
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(directory, file);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const book = new BookModel(
                    data.id,
                    data.title,
                    data.description,
                    data.questions
                );
                books.push(book);
            }
        });

        return books;
    }
}
