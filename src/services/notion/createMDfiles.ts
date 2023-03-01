import { notion } from '../../config/notion';
import { createMDwithBlock } from './createMDwithBlock';
import { getEditedPageList } from './getEditedPageList';
import fs from 'fs';

export const createMDfiles = async () => {
    const editedPageList = await getEditedPageList();
    for (const edited of editedPageList) {
        console.log(`[${editedPageList.indexOf(edited) + 1}] ${edited.title}`);
        fs.writeFileSync('res/' + edited.title + '.md', '', 'utf8');
        const response = await notion.blocks.children.list({
            block_id: edited.id,
        });

        for (const block of response.results) {
            if ('type' in block) {
                const markdownString = await createMDwithBlock(block, 0);
                if (markdownString !== undefined) {
                    fs.appendFileSync(
                        'res/' + edited.title + '.md',
                        markdownString + '\n\n',
                        'utf8',
                    );
                }
            }
        }
        console.log('markdown 파일 생성 완료.\n');
    }
};
