import { ProgramModel } from "./ProgramModel";

export interface BookModel {
    id: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    edition: number;
    pages: number;
    programs: ProgramModel[];
}