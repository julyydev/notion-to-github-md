import { createImage } from '../../utils/createImage';
import { uploadS3Image } from './uploadS3Image';

export const getS3Url = async (notionImageUrl: string, imageId: string) => {
    await createImage(notionImageUrl, imageId);
    const id = await uploadS3Image(imageId);

    return `https://s3.${process.env.AWS_S3_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${id}.png`;
};
