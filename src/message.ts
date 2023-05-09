const baseMessage = () => {
    console.log('DEBUG: check globalConfig.ts');
};

const printMessage = {
    notionOff: () => {
        baseMessage();
        console.log("- type of 'notion' is 'off'");
    },
    imageOff: () => {
        baseMessage();
        console.log("- type of 'image' is 'off'");
    },
};

export default printMessage;
