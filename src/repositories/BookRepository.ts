import bookNames from "../data/bookNames.json";

class BookRepository {
    public getBooks() {
        return bookNames;
    }
}

export default BookRepository;