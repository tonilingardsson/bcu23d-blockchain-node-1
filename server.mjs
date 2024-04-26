import express from "express";
import dotenv from "dotenv";

import blockRoutes from "./routes/blockRoutes.mjs";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/blocks', blockRoutes);

app.use('*', (req, res, next) => {
    next();
});

app.use((req, res, next) => {
    res.json({ msg: "Idiot! You are not allowed to see this!" });
});

app.listen(PORT, () =>
    console.log(
        `Server running on port ${PORT}, in ${process.env.NODE_ENV} mode.`
    )
);
