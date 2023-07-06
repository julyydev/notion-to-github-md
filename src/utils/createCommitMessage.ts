import { EditedPageProperties } from '../services/notion/getEditedPageList';
import fs from 'fs';

const createCommitMessage = (editedPageList: EditedPageProperties[]) => {
    if (editedPageList.length === 0) return;

    const messages: string[] = [];
    messages.push('[Post] ');
    messages.push(editedPageList[0].title);
    if (editedPageList.length > 1)
        messages.push(` 외 ${editedPageList.length - 1}건`);
    messages.push(' 글 작성');

    fs.writeFileSync('res/message.txt', messages.join(''), 'utf8');
};

export default createCommitMessage;
