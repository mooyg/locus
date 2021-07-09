"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
require("reflect-metadata");
const cors = require("cors");
const connectRedis = require("connect-redis");
const session = require("express-session");
const redis_1 = require("./redis/redis");
const createApolloServer_1 = require("./util/createApolloServer");
const corsOption_1 = require("./cors/corsOption");
const auth_1 = require("./auth");
const passport = require("passport");
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = Express();
    const apolloServer = yield createApolloServer_1.createApolloServer(db);
    const RedisStore = connectRedis(session);
    app.use(cors(corsOption_1.corsOptions));
    app.use(session({
        store: new RedisStore({
            client: redis_1.redis,
        }),
        name: 'qid',
        secret: 'shsaudasiua',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    app.use('/api/auth', auth_1.initializeAuthRoutes(passport, db));
    app.get('/', (req, res) => {
        console.log(req.user);
        res.send("hm didn't worked");
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log(process.env.TS_NODE_DEV);
        console.log('Server launched on http://localhost:4000/graphql 🚀 ');
    });
});
main();
//# sourceMappingURL=index.js.map