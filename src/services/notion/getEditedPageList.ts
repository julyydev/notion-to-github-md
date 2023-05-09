import { notion } from '../../config/notion';
import { PageStatus } from '../../constants/pageStatus';
import globalConfig from '../../globalConfig';
import printMessage from '../../message';
import { getS3Url } from '../aws/getS3Url';
import { getGoogleDriveUrl } from '../google_drive/getGoogleDriveUrl';

export interface EditedPageProperties {
    id: string;
    title: string;
    summary: string;
    slug: string;
    category: string;
    series: string;
    tag: string[];
    thumbnail: string;
    date: string;
}

const getThumbnail = async (page: any) => {
    if (globalConfig.image.save === 'off') {
        printMessage.imageOff();
        return '이미지 저장 off';
    }

    let url = '';
    if (globalConfig.image.uploadService === 'aws_s3') {
        url = await getS3Url(
            page.properties.thumbnail.files[0].file.url,
            `${page.properties.slug.rich_text[0].plain_text}_0`,
        );
    } else if (globalConfig.image.uploadService === 'google_drive') {
        url = await getGoogleDriveUrl(
            page.properties.thumbnail.files[0].file.url,
            `${page.properties.slug.rich_text[0].plain_text}_0`,
        );
    }
    return url;
};

export const getEditedPageList = async () => {
    const editedPageList: EditedPageProperties[] = [];

    const response = await notion.databases.query({
        database_id: '2d03181f-721b-410a-a832-0192af606f35',
        filter: {
            property: 'status',
            status: { equals: PageStatus.EDITED },
        },
    });

    for (const page of response.results) {
        if (
            // check page properties validation
            'properties' in page &&
            page.properties.title.type === 'title' &&
            page.properties.summary.type === 'rich_text' &&
            page.properties.slug.type === 'rich_text' &&
            page.properties.category.type === 'select' &&
            page.properties.series.type === 'select' &&
            page.properties.tag.type === 'multi_select' &&
            page.properties.thumbnail.type === 'files' &&
            page.properties.thumbnail.files[0].type === 'file'
        ) {
            if (
                // TODO: logic refactoring
                page.properties.title.title.length !== 0 &&
                page.properties.slug.rich_text.length !== 0 &&
                page.properties.summary.rich_text.length !== 0 &&
                page.properties.category.select !== null &&
                page.properties.thumbnail.files.length !== 0
            ) {
                editedPageList.push({
                    id: page.id,
                    title: page.properties.title.title[0].plain_text.replace(
                        / /g,
                        '-',
                    ),
                    summary: page.properties.summary.rich_text[0].plain_text,
                    slug: page.properties.slug.rich_text[0].plain_text,
                    category: page.properties.category.select.name,
                    series:
                        page.properties.series.select === null
                            ? ''
                            : page.properties.series.select.name,
                    tag: page.properties.tag.multi_select.map(t => t.name),
                    thumbnail: await getThumbnail(page),
                    date: new Intl.DateTimeFormat('ko', {
                        dateStyle: 'medium',
                    }).format(new Date()),
                });
            } else {
                console.log('필수 항목을 작성하지 않았습니다.');
            }
        } else {
            console.log('예상치 못한 에러가 발생하였습니다.');
        }
    }

    if (editedPageList.length === 0) console.log('배포할 글이 없습니다.');
    else console.log(editedPageList.length + '건의 글을 배포합니다.');

    return editedPageList;
};
