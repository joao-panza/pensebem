import { GenericFunctionalError, NotFoundError } from "../exceptions";
import { Injectable } from "../decorators";
import { ListBooksObjectType, ListProgramsObjectType, ValidateOjectType } from "../interfaces";
import { BookRepository, CalculateRepository } from "../repositories";
import { CalculateModel } from "../models";

@Injectable()
export class BookService {
    constructor(
        private bookRepository: BookRepository,
        private calculateRepository: CalculateRepository
    ) { }

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
            this.calculateRepository.resetQuestions();
            
            return {
                programs: programs.map((program) => {
                    const returnProgram = {
                        programId: program.id,
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

    public async validateProgram(bookId: string, programId: string, question: number, answer: string): Promise<ValidateOjectType> {
        try {
            const programs = await this.bookRepository.getPrograms(bookId);
            const program = programs.find((program) => program.id === programId);

            if (!program) {
                throw new NotFoundError(`Program ${programId} not found for the book ${bookId}`);
            }

            this.calculateRepository.addQuestion(question);
            
            if (!this.calculateRepository.hasAttempts(question)) {
                throw new GenericFunctionalError("No attempts left for this program");
            }
            
            const correct = program.answers[question - 1] === answer;
            
            const {
                score,
                attempt,
                correct: isCorrect,
            } = this.calculateRepository.saveAnswer(question, correct, answer);

            return {
                score,
                attempt,
                correct: isCorrect,
                answer
            }
        } catch (error) {
            throw error;
        }
    }

    public async calculate(): Promise<{result: number, questions: CalculateModel[]}> {
        try {
            const score = this.calculateRepository.calculateScore();

            return {
                result: score,
                questions: this.calculateRepository.getQuestions()
            };
        } catch (error) {
            throw new NotFoundError("Error calculating the score");
        }
    }
}
