import { notion } from '../../config/notion';
import { PageStatus } from '../../constants/pageStatus';

export const getEditedPageList = async () => {
    const editedPageList: { id: string; title: string }[] = [];

    const response = await notion.databases.query({
        database_id: '2d03181f-721b-410a-a832-0192af606f35',
    });

    response.results.forEach(page => {
        console.log(page);
        if ('properties' in page) {
            if ('상태' in page.properties) {
                if (page.properties.상태.type === 'status') {
                    if (
                        page.properties.상태.status?.name ===
                            PageStatus.EDITED &&
                        page.properties.제목.type === 'title'
                    ) {
                        editedPageList.push({
                            id: page.id,
                            title: page.properties.제목.title[0].plain_text.replace(
                                / /g,
                                '-',
                            ),
                        });
                    }
                }
            }
        }
    });

    console.log(editedPageList.length + '건의 글을 배포합니다.');

    return editedPageList;
};
