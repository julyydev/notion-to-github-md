import axios from 'axios';
import fs from 'fs';
import { uploadImage } from './uploadImage';
import { Stream } from 'stream';

const createImage = async (notionImageUrl: string, imageId: string) => {
    const response = await axios<Stream>({
        method: 'get',
        url: notionImageUrl,
        responseType: 'stream',
    });
    if (!fs.existsSync('res/image')) fs.mkdirSync('res/image');
    response.data.pipe(fs.createWriteStream(`res/image/${imageId}.png`));
    return new Promise((resolve, reject) => {
        response.data.on('error', err => {
            console.log('file read error.', err);
            resolve(reject);
        });
        response.data.on('end', () => {
            resolve('로컬에 이미지 생성 완료');
        });
    });
};

export const getGoogleDriveUrl = async (
    notionImageUrl: string,
    imageId: string,
) => {
    await createImage(notionImageUrl, imageId);
    const googleDriveId = await uploadImage(imageId);
    const googleDriveUrl =
        'https://drive.google.com/uc?export=view&id=' + googleDriveId;
    console.log(googleDriveUrl);

    return googleDriveUrl;
};
