import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { bookSearchableFields } from "./books.constants";
import { IBooks } from "./books.interface";
import { Book } from "./books.model";

const createBook = async (payload: IBooks) => {

    const book = await Book.create(payload);

    return book
};

const getAllBooks = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Book.find(), query)

    const books = await queryBuilder
        .search(bookSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        books.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleBook = async (bookId: string) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError(StatusCodes.NOT_FOUND, "Book not found");
    }
    return book;
};

const updateBook = async (bookId: string, payload: Partial<IBooks>) => {
    const book = await Book.findByIdAndUpdate({ _id: bookId }, payload, { new: true, runValidators: true });
    if (!book) {
        throw new AppError(StatusCodes.NOT_FOUND, "Book not found");
    }
    return book;
};

const deleteBook = async (bookId: string) => {
    const book = await Book.findByIdAndDelete({ _id: bookId });
    if (!book) {
        throw new AppError(StatusCodes.NOT_FOUND, "Book not found");
    }
    return book;
};

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
};