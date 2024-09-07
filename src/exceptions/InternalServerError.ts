export class InternalServerError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 500;
    }
}