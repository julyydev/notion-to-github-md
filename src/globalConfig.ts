type OnOffType = 'on' | 'off';
type ImageUploadServiceType = 'google_drive' | 'aws_s3';

interface GlobalConfig {
    notion: OnOffType;
    image: {
        save: OnOffType;
        uploadService?: ImageUploadServiceType;
    };
}

const globalConfig: GlobalConfig = {
    notion: 'on',
    image: {
        save: 'on',
        uploadService: 'aws_s3',
    },
};

export default globalConfig;
