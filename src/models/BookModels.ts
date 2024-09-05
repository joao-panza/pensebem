import { QuestionModel } from "./QuestionModel";

export class BookModel {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public questions: QuestionModel[]
    ) {}
}