import axios from 'axios';
import fs from 'fs';
import { Stream } from 'stream';

export const createImage = async (notionImageUrl: string, imageId: string) => {
    const response = await axios<Stream>({
        method: 'get',
        url: notionImageUrl,
        responseType: 'stream',
    });

    if (!fs.existsSync('res/image')) fs.mkdirSync('res/image');
    const writeStream = fs.createWriteStream(`res/image/${imageId}.png`);
    response.data.pipe(writeStream);

    return new Promise<string>((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve('로컬에 이미지 생성 완료');
        });
        writeStream.on('error', error => {
            console.log('file write error.', error);
            reject(error);
        });
    });
};
