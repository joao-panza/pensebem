/**
 * @class BookRepository
 * @description Classe responsável por gerenciar a leitura de arquivos JSON contendo dados de livros.
 */
import path from 'path';
import { Injectable, Cache } from "../decorators";
import { BookModel, ProgramModel } from '../models';
import { FileManager } from "../bin/FileManager";

@Injectable()
export class BookRepository {
    private readonly bookPath = path.join(__dirname, "..", "data");

    constructor(private fileManager: FileManager) {}

    @Cache
    public async getBooks(): Promise<Omit<BookModel, "programs">[]> {
        const listOfBooks = await this.fileManager.readFile<BookModel[]>(this.bookPath);
        return Array.from(listOfBooks, ({ programs: _, ...book }: BookModel) => book);
    }

    @Cache
    public async getPrograms(bookId: string): Promise<ProgramModel[]> {
        const listOfBooks = await this.fileManager.readFile<BookModel[]>(this.bookPath);
        const selectedBook = listOfBooks.find((book) => book.id === bookId);
        return selectedBook?.programs ?? [];
    }
}
