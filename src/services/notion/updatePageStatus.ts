import { notion } from '../../config/notion';
import { PageStatus } from '../../constants/pageStatus';

export const updatePageStatus = async (pageID: string, status: string) => {
    if (status === PageStatus.DEPLOYED) {
        await notion.pages.update({
            page_id: pageID,
            properties: {
                status: {
                    status: {
                        id: '9e27f0f0-4061-4b0f-bd97-015e9b60cf08',
                        name: status,
                        color: 'purple',
                    },
                },
            },
        });
    }
};
