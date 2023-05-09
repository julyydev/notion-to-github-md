import globalConfig from './globalConfig';
import printMessage from './message';
import { createMDfiles } from './services/notion/createMDfiles';

if (globalConfig.notion === 'on') {
    createMDfiles();
} else {
    printMessage.notionOff();
}
