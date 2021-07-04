const json = {
    header: [
        {
            id: "60dd9e3aa118a13f8995553b",
            tracking_number: "T00E4A0994620899",
            actionBox: {
                type: "prediction",
                label: "Estimated Delivery:",
            },
            courier: {
                name: "hermes-uk",
                prettyname: "Hermes",
                trackingurl:
                    "https://www.myhermes.co.uk/trackv2#/parcel/T00E4A0994620899/details",
                hide_trackingurl: false,
                trackingurl_label:
                    "Find further information about this order at Hermes",
                rerouteurl:
                    "https://www.myhermes.co.uk/trackv2#/parcel/T00E4A0994620899/details/diversions",
                rerouteurl_label_short: "Rearrange delivery",
                rerouteurl_label_long:
                    "You are not at home? Select your delivery day and location",
                rerouteurl_label_info: "if available",
                destination_courier: {
                    name: "hermes-uk",
                    prettyname: "Hermes",
                },
            },
            last_delivery_status: {
                code: "DestinationDeliveryCenter",
                status: "Delivery is being prepared",
                status_details:
                    "The goods have arrived in the destination region.",
            },
            delay: false,
            exception: false,
            delivery_info: {
                isReturn: false,
            },
        },
    ],
    body: {
        "60dd9e3aa118a13f8995553b": [
            {
                location: "",
                timestamp: "2021-07-01T00:00:00.000Z",
                status: "OrderProcessed",
                status_text: "Order processed",
                status_details: "The order has been processed.",
                shown: true,
                full_courier_status:
                    "If exists, date of order, else date of import to parcelLab",
                Specifics: "REDACTED",
            },
            {
                shown: true,
                location: "",
                timestamp: "2021-07-01T20:55:00.000Z",
                status: "PickUpScheduled",
                status_text: "Pick-up scheduled",
                status_details:
                    "The package has been processed and is waiting to be picked up by Hermes.",
                full_courier_status: "Pre-Advice Loaded",
                created: "2021-07-01T21:18:46.889Z",
                Specifics: "REDACTED",
            },
            {
                shown: true,
                timestamp: "2021-07-02T01:16:00.000Z",
                status: "InboundScan",
                status_text: "Dispatched",
                status_details: "The goods have been sent.",
                full_courier_status: "Hub Sorter Receipt Scan | 3 RUGBS",
                created: "2021-07-02T01:33:45.520Z",
                Specifics: "REDACTED",
            },
            {
                shown: true,
                timestamp: "2021-07-02T04:45:00.000Z",
                status: "InTransit",
                status_text: "In transit",
                status_details: "The goods are on the way.",
                full_courier_status: "Hub Trailer Via Sorter | 3 RUGBS",
                created: "2021-07-02T05:04:00.219Z",
                Specifics: "REDACTED",
            },
            {
                shown: true,
                timestamp: "2021-07-02T15:17:00.000Z",
                status: "DestinationDeliveryCenter",
                status_text: "Delivery is being prepared",
                status_details:
                    "The goods have arrived in the destination region.",
                full_courier_status: "Processed at Depot",
                created: "2021-07-02T15:39:10.762Z",
                Specifics: "REDACTED",
            },
        ],
    },
};

const body = Object.values(json.body);

console.log(body);
