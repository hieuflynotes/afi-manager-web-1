export class TrackingHMHelper {
    static getOrderProcess(status: string): number {
        switch (status) {
            case 'OrderProcessed':
                return 50;
            case 'Delivered':
                return 100;
            default:
                return 0;
        }
    }
}
