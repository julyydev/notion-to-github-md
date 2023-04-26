import { uploadImage } from './uploadImage';
import { createImage } from '../../utils/createImage';

export const getGoogleDriveUrl = async (
    notionImageUrl: string,
    imageId: string,
) => {
    await createImage(notionImageUrl, imageId);
    const googleDriveId = await uploadImage(imageId);
    const googleDriveUrl =
        'https://drive.google.com/uc?export=view&id=' + googleDriveId;
    // console.log(googleDriveUrl);

    return googleDriveUrl;
};
