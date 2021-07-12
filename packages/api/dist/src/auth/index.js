"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuthRoutes = void 0;
const express_1 = require("express");
const discord_1 = require("./Strategy/discord");
const initializeAuthRoutes = (passport, prisma) => {
    const authRouter = express_1.Router();
    authRouter.use('/discord', discord_1.discordOauth(passport, prisma));
    authRouter.use('/me', (req, res) => {
        console.log(req.user);
        if (req.user) {
            res.send(req.user);
        }
        else {
            res.redirect(process.env.NODE_ENV
                ? `${process.env.CLIENT_URL}/login`
                : 'http://localhost:3000');
        }
    });
    return authRouter;
};
exports.initializeAuthRoutes = initializeAuthRoutes;
//# sourceMappingURL=index.js.map