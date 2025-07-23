import { Model } from "mongoose";
import { GENRES } from "./books.validation";

type Genre = typeof GENRES[number];
export interface IBooks {
    title: string;  
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}

export interface IReqQuery {
  filter?: string | undefined;
  sortBy?: string | undefined;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface IBookStaticMethod extends Model<IBooks> {
  updateBookCopiesAndAvailable(book: IBooks, quantity: number): void
}