import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.routes"
import { UserRoutes } from "../modules/user/user.routes"
import { BooksRoutes } from "../modules/books/books.routes"
import { BorrowRoutes } from "../modules/borrow/borrow.routes"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/books",
        route: BooksRoutes
    },
    {
        path: "/borrow",
        route: BorrowRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)