import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

const colorMap = {
    gray: 'color: #787773',
    brown: 'color: #9e6b53',
    orange: 'color: #d97413',
    yellow: 'color: #ca902e',
    green: 'color: #458261',
    blue: 'color: #3a80ab',
    purple: 'color: #a07cbb',
    pink: 'color: #c14c8a',
    red: 'color: #d34e49',
    gray_background: 'background-color: #f1f1ef',
    brown_background: 'background-color: #f4eeee',
    orange_background: 'background-color: #faebdd',
    yellow_background: 'background-color: #fbf3da',
    green_background: 'background-color: #edf3ec',
    blue_background: 'background-color: #e6f3f7',
    purple_background: 'background-color: #f6f3f8',
    pink_background: 'background-color: #faf2f5',
    red_background: 'background-color: #fdebec',
};

export const convertRichTextToMD = (rich_text: RichTextItemResponse[]) => {
    if (rich_text.length === 0) return '<br>';
    const mds: string[] = [];
    rich_text.forEach(item => {
        if (item.type === 'text') {
            let temp = item.text.content;
            if (item.annotations.code) {
                temp = '`' + temp + '`';
            }
            if (item.annotations.bold) {
                temp = `**${temp}**`;
            }
            if (item.annotations.italic) {
                temp = `_${temp}_`;
            }
            if (item.annotations.strikethrough) {
                temp = `~~${temp}~~`;
            }
            if (item.annotations.underline) {
                temp = `<u>${temp}</u>`;
            }
            if (item.annotations.color !== 'default') {
                temp = `<span style="${
                    colorMap[item.annotations.color]
                }">${temp}</span>`;
            }
            if (item.href !== null) {
                temp = `[${temp}](${item.href})`;
            }
            mds.push(temp);
        }
    });
    return mds.join('');
};
