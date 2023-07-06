import { createImage } from '../../utils/createImage';
import { uploadS3Image } from './uploadS3Image';
import config from '../../config';

export const getS3Url = async (notionImageUrl: string, imageId: string) => {
    await createImage(notionImageUrl, imageId);
    const id = await uploadS3Image(imageId);

    return `https://s3.${config.image.aws_s3.region}.amazonaws.com/${config.image.aws_s3.bucket}/${id}.png`;
};
