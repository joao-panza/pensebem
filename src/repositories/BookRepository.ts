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
    constructor(
        private fileManager: FileManager
    ) {}

    @Cache
    public async getBooks(): Promise<BookModel[]> {
        const bookPath = path.join(__dirname, "..", "data");
        return this.fileManager.loadBooks<BookModel[]>(bookPath);
    }

    @Cache
    public async getPrograms(bookId: string): Promise<ProgramModel[]> {
        const programsPath = path.join(__dirname, "..", "data", bookId, "programs");
        return this.fileManager.loadPrograms(programsPath);
    }
}
