import fs from 'fs';
import path from 'path';

export const deleteImages = (folderPath: string) => {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // 폴더인 경우 재귀적으로 함수 호출
                deleteImages(curPath);
            } else {
                // 파일인 경우 삭제
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath); // 폴더 삭제
    }
};
