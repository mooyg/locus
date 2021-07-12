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
exports.discordOauth = void 0;
const express_1 = require("express");
const passport_discord_1 = require("passport-discord");
const discordOauth = (passport, prisma) => {
    const discordAuthRouter = express_1.Router();
    const scope = ['identify', 'email', 'guilds', 'guilds.join'];
    passport.use(new passport_discord_1.Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.CLIENT_URL
            ? `${process.env.CLIENT_URL}/api/auth/discord/callback`
            : 'http://localhost:4000/api/auth/discord/callback',
        scope,
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(profile);
        const findUser = yield prisma.user.findFirst({
            where: {
                email: profile.email,
            },
        });
        console.log(findUser);
        if (findUser) {
            console.log('Already exists');
            return done(null, findUser);
        }
        try {
            const discordUser = yield prisma.user.create({
                data: {
                    username: profile.username,
                    email: profile.email,
                    avatar: profile.avatar,
                    discord_user_id: profile.id,
                },
            });
            return done(null, discordUser);
        }
        catch (e) {
            return done(e, undefined);
        }
    })));
    discordAuthRouter.get('/', passport.authenticate('discord'));
    discordAuthRouter.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (_req, res) => {
        res.redirect('http://localhost:3000');
    });
    return discordAuthRouter;
};
exports.discordOauth = discordOauth;
//# sourceMappingURL=discord.js.map