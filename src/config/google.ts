import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const googleClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
);

// TODO: refresh token 재발급 및 저장 로직 필요
googleClient.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const google_drive = google.drive({ version: 'v3', auth: googleClient });
