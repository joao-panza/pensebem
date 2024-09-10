import { BookModel } from "../models/BookModel";

export interface BookObjectType extends BookModel {
    programs: string[];
}