import fs from 'fs';
import path from 'path';
import { Injectable, Cache } from "../decorators";
import { BookModel } from '../models/BookModels';

@Injectable()
export class BookRepository {
    public getBooks(): BookModel[] {
        return this.readJsonFiles();
    }

    @Cache
    private readJsonFiles(): BookModel[] {
        const books: BookModel[] = [];
        const directory = path.join(__dirname, '..', 'data');
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(directory, file);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const book = new BookModel(
                    data.id,
                    data.title,
                    data.description,
                    data.questions
                );
                books.push(book);
            }
        });

        return books;
    }
}
