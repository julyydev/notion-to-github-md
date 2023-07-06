import { S3 } from '@aws-sdk/client-s3';
import config from '../config';

export const aws_s3 = new S3({
    region: config.image.aws_s3.region as string,
    credentials: {
        accessKeyId: config.image.aws_s3.access_key_id as string,
        secretAccessKey: config.image.aws_s3.secret_access_key as string,
    },
});
