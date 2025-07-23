import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { BorrowController } from "./borrow.controller";
import { borrowSchema } from "./borrow.validation";



const router = Router()

// borrow a book
// POST /api/borrow
router.post(
    "/",
    checkAuth(...Object.values(Role)),
    validateRequest(borrowSchema),
    BorrowController.createBorrow
);
// get all borrowed books summary
router.get("/", BorrowController.borrowSummary);

export const BorrowRoutes = router