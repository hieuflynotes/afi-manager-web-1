export interface IConfig {
    applicationUrl: string;
    apiGatewayUrl: string;
    redirectToSaleManager: string;
}

const localConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3008',
    redirectToSaleManager: 'http://localhost:4002',
};

const developmentConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3002',
    redirectToSaleManager: 'http://localhost:4002',
};

const stagingConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'http://localhost:3002',
    redirectToSaleManager: 'http://localhost:4002',
};

const productionConfig: IConfig = {
    applicationUrl: `http://localhost:3000`,
    apiGatewayUrl: 'https://api.afi.afivn.com',
    redirectToSaleManager: 'http://localhost:4002',
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
