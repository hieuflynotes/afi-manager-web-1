export interface IConfig {
    applicationUrl: string;
    apiGatewayUrl: string;
    apiProxyUrl: string;
    apiSheetConfig: string
}

const localConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3008',
    apiProxyUrl: "https://apiproxy.afivn.com",
    apiSheetConfig: "https://script.google.com/macros/s/AKfycbxW4asrs4ORts7rMBm5iqW0PrJtCJGB9NJ1mnyeVmVqKYbMAQ8N4UP4eYnEYfhHIXg/exec"
};

const developmentConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3002',
    apiProxyUrl: "https://apiproxy.afivn.com",
    apiSheetConfig: "https://script.google.com/macros/s/AKfycbxW4asrs4ORts7rMBm5iqW0PrJtCJGB9NJ1mnyeVmVqKYbMAQ8N4UP4eYnEYfhHIXg/exec"
};

const stagingConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3002',
    apiProxyUrl: "https://apiproxy.afivn.com",
    apiSheetConfig: "https://script.google.com/macros/s/AKfycbxW4asrs4ORts7rMBm5iqW0PrJtCJGB9NJ1mnyeVmVqKYbMAQ8N4UP4eYnEYfhHIXg/exec"
};

const productionConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'https://api.afi.afivn.com',
    apiProxyUrl: "https://apiproxy.afivn.com",
    apiSheetConfig: "https://script.google.com/macros/s/AKfycbxW4asrs4ORts7rMBm5iqW0PrJtCJGB9NJ1mnyeVmVqKYbMAQ8N4UP4eYnEYfhHIXg/exec"
};

const config =
    process.env.REACT_APP_ENV === 'production'
        ? productionConfig
        : process.env.REACT_APP_ENV === 'staging'
            ? stagingConfig
            : process.env.REACT_APP_ENV === 'development'
                ? developmentConfig
                : localConfig;

export default config;
