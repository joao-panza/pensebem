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
        return listOfBooks.map(({ programs: _, ...book }: BookModel) => ({
            ...book,
            image: this.mountImageUrl(book.id)
        }));
    }

    @Cache
    public async getPrograms(bookId: string): Promise<ProgramModel[]> {
        const listOfBooks = await this.fileManager.readFile<BookModel[]>(this.bookPath);
        const selectedBook = listOfBooks.find((book) => book.id === bookId);
        return selectedBook?.programs.map(program => ({
            ...program,
            file: this.mountProgramUrl(bookId, program.id)
        })) ?? [];
    }

    private mountImageUrl(bookId: string): string {
        return this.getHostName().concat("data/", bookId, "/book-image.jpg");
    }

    private mountProgramUrl(bookId: string, programId: string): string {
        return this.getHostName().concat("data/", bookId, `program-${programId}.pdf`);
    }

    private getHostName(): string {
        return process.env.HOST || 'http://localhost:4000/';
    }
}
