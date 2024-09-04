import BookRepository from "../repositories/BookRepository";

class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    public getListOfBooks() {
        return this.bookRepository.getBooks();
    }

    public getBookById(id: number) {
        return null;
    }
}

export default BookService;