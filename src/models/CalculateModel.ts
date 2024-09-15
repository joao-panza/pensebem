export interface CalculateAnswerModel {
    correct: boolean;
    answer: string;
}

export interface CalculateModel {
    correct: boolean;
    attempt: number;
    score: number;
    answers: CalculateAnswerModel[];
}