import express from "express";
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const requestRouter = express.Router();

requestRouter.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    
    const redirectUrl = 'http://localhost:5173';

    const oAuth2Client = new OAuth2Client(
        '1077501959489-cgcbecp3lobn58cd4ensnplomduevr7d.apps.googleusercontent.com',
        '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',
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    });

    res.json({ url: authorizeUrl });
});

export default requestRouter;
