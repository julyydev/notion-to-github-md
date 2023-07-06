import { notion } from '../../config/notion';
import { createMDFrontMatter } from './createMDFrontMatter';
import { createMDwithBlock } from './createMDwithBlock';
import { getEditedPageList } from './getEditedPageList';
import fs from 'fs';
import { updatePageStatus } from './updatePageStatus';
import { PageStatus } from '../../constants/pageStatus';
import { deleteImages } from '../../utils/deleteImages';
import createCommitMessage from '../../utils/createCommitMessage';

export const createMDfiles = async () => {
    if (!fs.existsSync('res')) fs.mkdirSync('res');
    if (!fs.existsSync('res/md')) fs.mkdirSync('res/md');

    const editedPageList = await getEditedPageList();
    createCommitMessage(editedPageList);

    for (const page of editedPageList) {
        console.log(page);
        console.log(`[${editedPageList.indexOf(page) + 1}] ${page.title}`);
        fs.writeFileSync('res/md/' + page.slug + '.md', '', 'utf8');

        const frontMatter = await createMDFrontMatter(page);
        fs.appendFileSync('res/md/' + page.slug + '.md', frontMatter, 'utf8');

        const response = await notion.blocks.children.list({
            block_id: page.id,
        });
        let image_index = 1;
        for (const block of response.results) {
            if (!('type' in block)) continue;

            const markdownString = await createMDwithBlock(
                block,
                0,
                page.slug,
                image_index,
            );
            if (block.type === 'image') image_index++;
            if (markdownString !== undefined) {
                fs.appendFileSync(
                    'res/md/' + page.slug + '.md',
                    markdownString + '\n\n',
                    'utf8',
                );
            }
        }

        updatePageStatus(page.id, PageStatus.DEPLOYED);
    }

    deleteImages('res/image');
};
