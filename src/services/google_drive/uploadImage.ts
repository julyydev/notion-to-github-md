import fs from 'fs';
import { google_drive } from '../../config/google';

export const uploadImage = async (imageId: string) => {
    const fileMetadata = {
        name: `${imageId}.png`,
        mimeType: 'image/png',
        parents: ['1DP9x9iGgSc3Duc9GJTpK18ctOWD2tzFP'], // google drive directory id
    };

    const media = {
        mimeType: 'image/png',
        body: fs.createReadStream(`res/image/${imageId}.png`),
    };

    const response = await google_drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
    });

    return response.data.id;
};
