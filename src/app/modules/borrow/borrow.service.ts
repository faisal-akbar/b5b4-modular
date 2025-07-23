import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IBorrowCreate } from "./borrow.interface";
import { Borrow } from "./borrow.model";
import { Book } from "../books/books.model";

const createBorrow = async (payload: IBorrowCreate) => {

    const { book, quantity, dueDate } = payload;
    // Check if the book exists and has enough copies available
    const bookRecord = await Book.findById(book);

    if (!bookRecord) {
        throw new AppError(StatusCodes.NOT_FOUND, "Book not found");
    }

    if (bookRecord.copies < quantity) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Not enough copies available");
    }

    // Update copies and available status
    Book.updateBookCopiesAndAvailable(bookRecord, quantity);

    // Save the borrow record with all relevant details.
    const borrow = await Borrow.create({
        book: bookRecord._id,
        quantity,
        dueDate: new Date(dueDate),
    });

    return borrow;
};


const getBorrowSummary = async () => {
    const borrowedBooks = await Borrow.aggregate([
          {
            $group: {
              _id: "$book",
              totalQuantity: { $sum: "$quantity" },
            },
          },
          {
            $lookup: {
              from: "books",
              localField: "_id",
              foreignField: "_id",
              as: "bookDetails",
            },
          },
          {
            $unwind: "$bookDetails",
          },
          {
            $project: {
              _id: 0,
              book: {
                title: "$bookDetails.title",
                isbn: "$bookDetails.isbn",
              },
              totalQuantity: 1,
            },
          },
        ]);
    return borrowedBooks;
}

export const BorrowService = {
    createBorrow,
    getBorrowSummary
};