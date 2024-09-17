import { NotFoundError } from "../exceptions";
import { CalculateModel } from "../models";

export class CalculateRepository {
    private readonly NUM_MAX_ATTEMPT = 3;
    private readonly ONE = 1;
    private readonly SCORE_RULES = [0, 1, 2, 3];

    private questions: Map<number, CalculateModel> = new Map();

    public addQuestion(question: number): void {
        if (!this.questions.has(question)) {
            this.questions.set(question, {
                score: 0,
                attempt: this.NUM_MAX_ATTEMPT,
                correct: false,
                answers: []
            });
        }
    }
    
    public saveAnswer(question: number, correctAnswer: boolean, answer: string): CalculateModel {
        this.questionExists(question);
        let currentQuestion = this.questions.get(question)!;
        const result = { ...currentQuestion };

        if(result.correct) {
            return result;
        }

        result.answers.push({
            answer,
            correct: correctAnswer,
        });

        if(!result.correct && !correctAnswer) {
            result.attempt -= this.ONE;
            this.questions.set(question, result);
            return result;
        }

        result.score = this.SCORE_RULES[result.attempt];
        result.correct = correctAnswer;

        this.questions.set(question, result);
        return result;
    }

    public getAttempts(question: number): number {
        this.questionExists(question);

        return this.questions.get(question)!.attempt;
    }

    public calculateScore() {
        return Array.from(this.questions.values()).reduce((acc, current) => acc + current.score, 0);
    }

    public hasAttempts(question: number): boolean {
        this.questionExists(question);

        return this.questions.get(question)!.attempt > 0;
    }

    public resetQuestions(): void {
        this.questions = new Map();
    }

    public getQuestions(): CalculateModel[] {
        return Array.from(this.questions.values());
    }

    private questionExists(question: number): void {
        if (!this.questions.has(question)) {
            throw new NotFoundError("Question not found");
        }
    }
}
