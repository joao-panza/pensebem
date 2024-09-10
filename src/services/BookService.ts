/**
 * @class BookService
 * @description Classe responsável pela lógica de negócios relacionada aos livros.
 */
import { NotFoundError } from "../exceptions";
import { Injectable } from "../decorators";
import { ListBooksObjectType, ListProgramsObjectType } from "../interfaces";
import { BookRepository } from "../repositories";

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository) { }

    public async getListOfBooks(): Promise<ListBooksObjectType> {
        try {
            const books = await this.bookRepository.getBooks();
            
            return {
                books,
                quantity: books.length
            };
        } catch (error) {
            throw new NotFoundError("Books not found in the server");
        }
    }

    public async getBookPrograms(bookId: string): Promise<ListProgramsObjectType> {
        try {
            const programs = await this.bookRepository.getPrograms(bookId);
            
            return {
                programs: programs.map((program) => {
                    const returnProgram = {
                        programId: program.programId,
                        quantity: program.answers.length
                    };
                    return returnProgram;
                }),
                quantity: programs.length
            };
        } catch (error) {
            throw new NotFoundError(`Programs not found for the book ${bookId}`);
        }
    }

    public async validateProgram(bookId: string, programId: string, question: number, answer: string): Promise<{ correct: boolean }> {
        try {
            const programs = await this.bookRepository.getPrograms(bookId);
            const program = programs.find((program) => program.programId === programId);
            if (!program) {
                throw new NotFoundError(`Program ${programId} not found for the book ${bookId}`);
            }

            const correct = program.answers[question - 1] === answer;
            return { correct };
        } catch (error) {
            throw new NotFoundError(`Program ${programId} not found for the book ${bookId}`);
        }
    }
}
