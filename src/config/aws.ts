import { S3 } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

export const aws_s3 = new S3({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});
