import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    type: 'service_account',
    project_id: 'blog-image-management',
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: 'bim-server@blog-image-management.iam.gserviceaccount.com',
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/bim-server%40blog-image-management.iam.gserviceaccount.com',
};

const googleAuth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const auth = googleAuth.fromJSON(config);

export const google_drive = google.drive({
    version: 'v3',
    auth: auth,
});
