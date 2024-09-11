export class CalculateRepository {
    private readonly NUM_MAX_ATTEMPT = 3;
    private readonly ONE = 1;
    private readonly SCORE_RULES = [0, 1, 2, 3];

    private attempts: number;
    private answers: number[] = [];

    constructor () {
        this.attempts = this.NUM_MAX_ATTEMPT;
    }
    
    public decrementAttempts(): void {
        this.attempts -= this.ONE;
    }

    public getAttempts(): number {
        return this.attempts;
    }

    public saveAnswer(question: number): void {
        const score = this.SCORE_RULES[this.attempts];
        this.answers[question] = score;
        this.resetAttempts();
    }

    public calculatePoints() {
        return this.answers.reduce((acc: number, current: number) => {
            return acc + current;
        }, 0);
    }

    private resetAttempts(): void {
        this.attempts = this.NUM_MAX_ATTEMPT;
    }
}
