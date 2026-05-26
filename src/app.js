import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import marginRouter from "./routes/margin.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import portfolioRouter from "./routes/portfolio.routes.js";
import marketRouter from "./routes/market.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/margin", marginRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/market", marketRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        errors: err.errors || [],
    });
});

export default app;