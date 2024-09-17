import fs from 'fs';
import path from 'path';
import { Cache, Injectable } from '../decorators';

@Injectable()
export class FileManager {
    @Cache
    public readFile<T>(filePath: string): Promise<T> {
        return new Promise((resolve, reject) => {            
            fs.readdir(filePath, (error: NodeJS.ErrnoException | null, files) => {
                if (error) {
                    return reject(error);
                }

                const bookList = Array.from(files, (file: any) => {
                    const bookPath = path.join(filePath, file, "book.json");

                    if (fs.existsSync(bookPath)) {
                        const fileString = fs.readFileSync(bookPath, "utf-8");
                        return JSON.parse(fileString) as T;
                    }
                });

                resolve(bookList as T);
            });
        });
    }
}