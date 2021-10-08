export interface ExcelConfig {
    bot: Url;
    dashboard: Url;
    general: Url;
}

interface Url {
    apiGatewayUrl: string;
    libUrl: string;
  }