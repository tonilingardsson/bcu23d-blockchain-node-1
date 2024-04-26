import { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import express from "express";

import blockRoutes from "./routes/blockRoutes.mjs";
import errorHandler from "./middleware/errorHandler.mjs";
import ErrorResponseModel from "./utils/ErrorResponseModel.mjs";

global.__appdir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/blocks', blockRoutes);

app.all('*', (req, res, next) => {
    next(new ErrorResponseModel(`Can't find the resource at ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

app.listen(PORT, () =>
    console.log(
        `Server running on port ${PORT}, in ${process.env.NODE_ENV} mode.`
    )
);
