import express from "express";

const router = express.Router();

router.route('/').get((req, res, next) => {
    res.json({
        msg: "Hello from blockRoutes.mjs!"

    });
});

export default router;