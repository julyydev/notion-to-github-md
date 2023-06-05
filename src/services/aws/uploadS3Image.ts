import { aws_s3 } from '../../config/aws';
import fs from 'fs';

export const uploadS3Image = async (imageId: string) => {
    await aws_s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${imageId}.png`,
        Body: fs.createReadStream(`res/image/${imageId}.png`),
    });

    return imageId;
};
