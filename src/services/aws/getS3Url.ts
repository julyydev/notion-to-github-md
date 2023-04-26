import { createImage } from '../../utils/createImage';
import { uploadS3Image } from './uploadS3Image';

export const getS3Url = async (notionImageUrl: string, imageId: string) => {
    await createImage(notionImageUrl, imageId);
    const id = await uploadS3Image(imageId);

    return `https://s3.ap-northeast-2.amazonaws.com/julyy.dev/${id}.png`;
};
