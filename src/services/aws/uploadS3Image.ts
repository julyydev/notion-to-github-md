import { aws_s3 } from '../../config/aws';
import fs from 'fs';
import config from '../../config';

export const uploadS3Image = async (imageId: string) => {
    await aws_s3.putObject({
        Bucket: config.image.aws_s3.bucket as string,
        Key: `${imageId}.png`,
        Body: fs.createReadStream(`res/image/${imageId}.png`),
    });

    return imageId;
};
