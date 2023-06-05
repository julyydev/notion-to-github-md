import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { createMDwithChildrenBlock } from './createMDwithChildrenBlock';
import { convertRichTextToMD } from '../../utils/convertRichTextToMD';
import { getS3Url } from '../aws/getS3Url';
import globalConfig from '../../globalConfig';
import printMessage from '../../message';

interface createMDParameter {
    block: BlockObjectResponse;
    depth: number;
    slug: string;
    index: number;
}

const createParagraphMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'paragraph') return;

    const mds: string[] = [];
    mds.push(convertRichTextToMD(block.paragraph.rich_text));
    return mds.join('');
};

const createHeading1MD = async ({ block }: createMDParameter) => {
    if (block.type !== 'heading_1') return;

    const mds: string[] = [];
    mds.push('# ');
    mds.push(convertRichTextToMD(block.heading_1.rich_text));
    return mds.join('');
};

const createHeading2MD = async ({ block }: createMDParameter) => {
    if (block.type !== 'heading_2') return;

    const mds: string[] = [];
    mds.push('## ');
    mds.push(convertRichTextToMD(block.heading_2.rich_text));
    return mds.join('');
};

const createHeading3MD = async ({ block }: createMDParameter) => {
    if (block.type !== 'heading_3') return;

    const mds: string[] = [];
    mds.push('### ');
    mds.push(convertRichTextToMD(block.heading_3.rich_text));
    return mds.join('');
};

const createBulletedListItemMD = async ({
    block,
    depth,
}: createMDParameter) => {
    if (block.type !== 'bulleted_list_item') return;

    const mds: string[] = [];
    mds.push('-  ');
    mds.push(convertRichTextToMD(block.bulleted_list_item.rich_text));
    if (block.has_children) {
        mds.push('\n\n');
        mds.push(await createMDwithChildrenBlock(block.id, ++depth));
    }
    return mds.join('');
};

const createNumberedListItemMD = async ({
    block,
    depth,
}: createMDParameter) => {
    if (block.type !== 'numbered_list_item') return;

    const mds: string[] = [];
    mds.push('1.  ');
    mds.push(convertRichTextToMD(block.numbered_list_item.rich_text));
    if (block.has_children) {
        mds.push('\n\n');
        mds.push(await createMDwithChildrenBlock(block.id, ++depth));
    }
    return mds.join('');
};

const createQuoteMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'quote') return;

    const mds: string[] = [];
    mds.push('> ');
    mds.push(convertRichTextToMD(block.quote.rich_text));
    return mds.join('');
};

const createToDoMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'to_do') return;

    const mds: string[] = [];
    mds.push('- [');
    mds.push(block.to_do.checked ? 'x]  ' : ' ]  ');
    mds.push(convertRichTextToMD(block.to_do.rich_text));
    return mds.join('');
};

const createToggleMD = async ({ block, depth }: createMDParameter) => {
    if (block.type !== 'toggle') return;

    const mds: string[] = [];
    mds.push('<details>\n<summary>');
    mds.push(convertRichTextToMD(block.toggle.rich_text));
    mds.push('</summary>\n<div>\n');
    if (block.has_children) {
        mds.push(await createMDwithChildrenBlock(block.id, ++depth));
    }
    mds.push('\n</div>\n</details>');
    return mds.join('');
};

const createEquationMD = async ({ block }: createMDParameter) => {
    // TODO:
    if (block.type !== 'equation') return;

    return 'equation(미구현)';
};

const createCodeMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'code') return;

    const mds: string[] = [];
    mds.push('```');
    mds.push(block.code.language);
    mds.push('\n');
    mds.push(convertRichTextToMD(block.code.rich_text));
    mds.push('\n```');
    return mds.join('');
};

const createCalloutMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'callout') return;

    const mds: string[] = [];
    mds.push('<aside>\n');
    if (block.callout.icon?.type === 'emoji') {
        mds.push(block.callout.icon.emoji);
    }
    mds.push(' ');
    mds.push(convertRichTextToMD(block.callout.rich_text));
    mds.push('\n</aside>');
    return mds.join('');
};

const createDividerMD = async ({ block }: createMDParameter) => {
    if (block.type !== 'divider') return;

    return '---';
};

const createTableMD = async ({ block }: createMDParameter) => {
    // TODO:
    if (block.type !== 'table') return;

    return 'table(미구현)';
};

const createBookmarkMD = async ({ block }: createMDParameter) => {
    // TODO:
    if (block.type !== 'bookmark') return;

    // console.log(block);
    return 'bookmark(미구현)';
};

const createImageMD = async ({ block, slug, index }: createMDParameter) => {
    if (block.type !== 'image') return;

    if (globalConfig.image.save === 'off') {
        printMessage.imageOff();
        return;
    }

    const mds: string[] = [];
    if (block.image.type === 'file') {
        mds.push('![');
        if (block.image.caption.length !== 0)
            mds.push(block.image.caption[0].plain_text);
        mds.push('](');

        if (globalConfig.image.uploadService === 'aws_s3') {
            mds.push(await getS3Url(block.image.file.url, `${slug}_${index}`));
        }

        mds.push(')');
    }
    return mds.join('');
};

const handleInvalidBlockType = async ({ block }: createMDParameter) => {
    console.log('유효하지 않은 block type 입니다: ' + block.type);
    return undefined;
};

const blockTypeMap = {
    paragraph: createParagraphMD,
    heading_1: createHeading1MD,
    heading_2: createHeading2MD,
    heading_3: createHeading3MD,
    bulleted_list_item: createBulletedListItemMD,
    numbered_list_item: createNumberedListItemMD,
    quote: createQuoteMD,
    to_do: createToDoMD,
    toggle: createToggleMD,
    template: handleInvalidBlockType,
    synced_block: handleInvalidBlockType,
    child_page: handleInvalidBlockType,
    child_database: handleInvalidBlockType,
    equation: createEquationMD,
    code: createCodeMD,
    callout: createCalloutMD,
    divider: createDividerMD,
    breadcrumb: handleInvalidBlockType,
    table_of_contents: handleInvalidBlockType,
    column_list: handleInvalidBlockType,
    column: handleInvalidBlockType,
    link_to_page: handleInvalidBlockType,
    table: createTableMD,
    table_row: handleInvalidBlockType,
    embed: handleInvalidBlockType,
    bookmark: createBookmarkMD,
    image: createImageMD,
    video: handleInvalidBlockType,
    pdf: handleInvalidBlockType,
    file: handleInvalidBlockType,
    audio: handleInvalidBlockType,
    link_preview: handleInvalidBlockType,
    unsupported: handleInvalidBlockType,
};

export const createMDwithBlock = async (
    block: BlockObjectResponse,
    depth: number,
    slug: string,
    index: number,
) => {
    return await blockTypeMap[block.type]({ block, depth, slug, index });
};
