import { notion } from '../../config/notion';
import { createMDwithBlock } from './createMDwithBlock';

export const createMDwithChildrenBlock = async (
    block_id: string,
    depth: number,
) => {
    const response = await notion.blocks.children.list({ block_id: block_id });
    const mds: string[] = [];
    mds.push('    '.repeat(depth));
    for (const block of response.results) {
        if ('type' in block) {
            const md = await createMDwithBlock(block, depth, '', 0);
            md !== undefined && mds.push(md);
        }
    }

    return mds.join('');
};
