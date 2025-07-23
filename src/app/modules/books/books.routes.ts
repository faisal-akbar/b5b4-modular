import { BooksController } from './books.controller';
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { bookUpdateSchema, createBookSchema } from "./books.validation";


const router = Router()

// create a new book
router.post(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createBookSchema._def.schema),
    BooksController.createBook
);
// get all divisions
router.get("/", BooksController.getAllBooks);

// get a single book
router.get(
    "/:bookId",
    BooksController.getSingleBook
);

// update a book
router.put(
    "/:bookId",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(bookUpdateSchema._def.schema),
    BooksController.updateBook
);
router.delete("/:bookId", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), BooksController.deleteBook);

export const BooksRoutes = router