import { EditedPageProperties } from './getEditedPageList';

export const createMDFrontMatter = async (page: EditedPageProperties) => {
    const mds: string[] = [];
    mds.push('---\n');
    mds.push(`title: ${page.title}\n`);
    mds.push(`summary: ${page.summary}\n`);
    mds.push(`slug: ${page.slug}\n`);
    mds.push(`date: ${page.date}\n`);
    mds.push(`category: ${page.category}\n`);
    mds.push(`series: ${page.series}\n`);
    mds.push('tag:\n');
    page.tag.forEach(t => mds.push(`    - ${t}\n`));
    mds.push(`thumbnail: ${page.thumbnail}\n`);
    mds.push('---\n\n');
    return mds.join('');
};
