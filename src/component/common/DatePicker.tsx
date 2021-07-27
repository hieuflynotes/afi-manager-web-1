import { Box, TextField } from '@material-ui/core';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap';
// import "../../styles/bootstrap.css";

export default function DatePicker(props: Props) {
    moment.defaultFormat = 'DD/MM/YYYY';
    const [date, setDate] = useState<string>(
        `Custom Range: ${moment(props.initStartDate || new Date()).format('DD/MM/YYYY')} - ${moment(
            props.initEndDate || new Date(),
        ).format('DD/MM/YYYY')}`,
    );

    const getDefaultString = () => {};

    useEffect(() => {
        setDate(
            `Custom Range: ${moment(props.initStartDate || new Date()).format('DD/MM/YYYY')} - ${moment(
                props.initEndDate || new Date(),
            ).format('DD/MM/YYYY')}`,
        );
        console.log(props);
    }, [props.initEndDate, props.initStartDate]);

    return (
        <Box>
            <DateRangePicker
                onApply={(e, picker) => {
                    // setDate(
                    // 	moment(picker.startDate._d).format("L") +
                    // 		"  -  " +
                    // 		moment(picker.endDate._d).format("L")
                    // );
                    setDate(
                        String(picker.chosenLabel).toLowerCase() === 'today' ||
                            String(picker.chosenLabel).toLowerCase() === 'yesterday'
                            ? picker.chosenLabel + `:   ${moment(picker.startDate).format()}`
                            : String(picker.chosenLabel).toLowerCase() === 'all'
                            ? picker.chosenLabel
                            : picker.chosenLabel +
                              ':   ' +
                              moment(picker.startDate).format() +
                              ' - ' +
                              moment(picker.endDate).format(),
                    );
                    props.onChangeDateRange({
                        startDate: picker.chosenLabel === 'All' ? undefined : picker.startDate._d,
                        endDate: picker.chosenLabel === 'All' ? undefined : picker.endDate._d,
                    });
                }}
                initialSettings={{
                    startDate: moment(props.initStartDate || new Date()),
                    endDate: moment(props.initEndDate || new Date()),
                    ranges: {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [
                            moment().subtract(1, 'month').startOf('month'),
                            moment().subtract(1, 'month').endOf('month'),
                        ],
                        // All: [moment().startOf('month'), moment().startOf('month')],
                    },
                    opens: 'left',
                    locale: {
                        format: 'DD/MM/YYYY',
                    },
                    // showCustomRangeLabel: false,
                    // alwaysShowCalendars: true,
                    // locale: {
                    // 	customRangeLabel: "df",
                    // }
                }}
            >
                <TextField
                    // type="date"
                    label={props.label}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={date}
                    style={{ minWidth: '315px' }}
                    // onClickCapture={() => setOpen(!open)}
                ></TextField>
            </DateRangePicker>
            {/* <DateRangePicker
							open={open}
							toggle={() => setOpen(!open)}
							onChange={handleChangeDateRange}
							children
						/> */}
        </Box>
    );
}

type Props = {
    onChangeDateRange(dateRange: DateRange): void;
    label: string;
    isHiddenAll?: string;
    initStartDate?: Date;
    initEndDate?: Date;
};

export interface DateRange {
    startDate: Date | undefined;
    endDate: Date | undefined;
}
