/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Popover,
    Popper,
    Select,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import { Pagination } from '@material-ui/lab';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { BsLayoutThreeColumns } from 'react-icons/bs';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';
import { createNonNullExpression } from 'typescript';
import { localStoryController } from '../../controller';
import { Paging, ListFilter, BaseModel } from 'luong-base-model';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import theme from '../../theme/MuiTheme';

const useStyle = makeStyles((theme) => ({
    cell: {
        flex: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    buttonHeader: {
        color: theme.palette.primary.main,
        paddingLeft: 0,
        alignItems: 'left',
        display: 'flex',
        fontSize: '1.1rem',
        textTransform: 'none',
        background: 'none',
        '&:active': {
            background: 'none',
        },
        '& *': {
            background: 'none !important',
        },
        // borderBottom: `1px solid ${theme.palette.divider}`,
    },
    popupShowColumn: {
        // background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        // borderRadius: theme.spacing(1),
    },
    frPaging: {
        padding: theme.spacing(6),
    },
    headerNotSort: {
        // color: theme.palette.primary.main,
    },
    textAutoHidden: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
    },
}));
export class ColumnTable<T extends { [key: string]: any }> {
    id: keyof T = '';
    label: string = '';
    isDisplay?: boolean = true;
    isSort?: boolean = false;
    acceptSearch?: boolean = false;
}
export type ColumnElement<T extends { [key: string]: any }> = {
    [P in keyof T]: React.ReactElement | string | any;
};
export type PropsTable<T> = {
    id?: string;
    column: ColumnTable<T>[];
    isShowHighlightText?: boolean;
    data: Paging<T & { action?: any }>;
    onQuery: (query: ListFilter<T>) => void;
    query: ListFilter<T>;
    onChangeColumn?: (column: ColumnTable<T>[]) => void;
    onCustomerCell?: (item: T) => ColumnElement<T>;
    otherFilter?: React.ReactElement;
    pageSize?: number[];
};
export default function TableCrud<T extends BaseModel>(props: PropsTable<T>) {
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [datas, setData] = useState<any>(props.data.rows);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(Boolean(anchorEl) ? null : event.currentTarget);
    };

    const changeSort = (column: string) => {
        column = column.toString();
        let sort: string[] = (props.query.sort as []) || [];
        const getColumnIndex: number = sort.findIndex((item) => _.snakeCase(item) === _.snakeCase(column));
        if (getColumnIndex < 0) sort = [column];
        else {
            const getColumn: string = sort[getColumnIndex];
            if (getColumn.startsWith('-')) {
                sort.splice(getColumnIndex, 1);
            } else {
                sort[getColumnIndex] = `-${column}`;
            }
        }
        props.onQuery({
            ...props.query,
            sort,
        });
    };

    const onDisplayColumn = (column: string) => {
        // const newColumns =
        let columnDisplay: string[] = [];
        props.column.map((item) => {
            if (item.id === column) item.isDisplay = !item.isDisplay;
            if (item.isDisplay) columnDisplay.push(item.id as string);
            return item;
        });
        const searchField = changeSearchFiledByChangeColumn();
        props.onQuery({ ...props.query, searchFields: searchField });
        if (props.id) {
            localStoryController.setSettingColumnTable({
                idTable: props.id,
                column: columnDisplay,
            });
        }
        props.onChangeColumn && props.onChangeColumn(props.column);
    };

    const open = Boolean(anchorEl);

    const componentSort = (column: string) => {
        let sort: string[] = (props.query.sort as []) || [];
        const getColumnIndex: number = sort.findIndex((item) => _.snakeCase(item) === _.snakeCase(column));
        if (getColumnIndex < 0) return <TiArrowUnsorted />;
        else {
            const getColumn: string = sort[getColumnIndex];
            if (getColumn.startsWith('-')) {
                return <TiArrowSortedDown />;
            } else {
                return <TiArrowSortedUp />;
            }
        }
    };

    const onQueryChanged = useCallback(
        _.debounce((value: string) => {
            const searchField = changeSearchFiledByChangeColumn();
            props.onQuery({
                ...props.query,
                search: value,
                page: 1,
                searchFields: searchField,
            });
        }, 400),
        [],
    );

    useEffect(() => {
        let getData: any[] = props.data.rows || [];
        if (props.onCustomerCell) {
            getData = getData.map((item) => {
                let newItem = _.cloneDeep(item);
                if (props.onCustomerCell) {
                    newItem = props.onCustomerCell(newItem);
                }
                let newItemClone = _.cloneDeep(newItem);
                // eslint-disable-next-line array-callback-return
                props.column.map((key) => {
                    _.set(
                        newItemClone,
                        key.id,
                        <Typography className={classes.textAutoHidden}>{_.get(newItemClone, key.id)}</Typography>,
                    );
                });
                return newItem;
            });
        }
        setData(getData);
    }, [props]);

    const changeSearchFiledByChangeColumn = () => {
        const searchField: string[] = [];
        // eslint-disable-next-line array-callback-return
        props.column.map((column) => {
            if (column.isDisplay == undefined || column.isDisplay == null) column.isDisplay = true;
            if (column.acceptSearch && column.isDisplay) {
                searchField.push(column.id as string);
            }
        });
        return searchField;
    };

    useEffect(() => {
        let getColumnDisplay: Map<string, string> | null = null;
        if (props.id) {
            let getFromLocal = localStoryController.getSettingColumnTable(props.id);

            if (getFromLocal && getFromLocal.length > 0) {
                getColumnDisplay = new Map(getFromLocal.map((item) => [item, item]));
            }
        }
        let columnDisplay: string[] = [];
        props.column.map((column) => {
            if (getColumnDisplay) {
                column.isDisplay = getColumnDisplay.get(column.id as string) ? true : false;
            }
            if (column.isDisplay == undefined || column.isDisplay == null) column.isDisplay = true;
            if (props.id && column.isDisplay == true) {
                columnDisplay.push(column.id as string);
            }
        });
        if (props.id) {
            localStoryController.setSettingColumnTable({
                idTable: props.id as string,
                column: columnDisplay,
            });
        }
    }, [props.column]);

    return (
        <Grid container spacing={2}>
            <Grid xs={12} item container justify="space-between" direction="row">
                <Grid>
                    <TextField label="Tìm kiếm" onChange={(e) => onQueryChanged(e.target.value)}></TextField>
                </Grid>
                <Grid>
                    <IconButton onClick={handleClick}>
                        <BsLayoutThreeColumns />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={(e) => handleClick(e as any)}
                        className={classes.popupShowColumn}
                    >
                        <FormControl className={globalStyle.pp3}>
                            <Grid className={globalStyle.pp1}>Cột hiển thị</Grid>
                            <FormGroup>
                                {props.column.map((column) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color={'primary'}
                                                checked={column.isDisplay}
                                                onClick={(e) => onDisplayColumn(column.id as string)}
                                            />
                                        }
                                        label={column.label}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                    </Popover>
                </Grid>
            </Grid>
            {props.otherFilter && (
                <Grid
                    xs={12}
                    item
                    style={{
                        padding: theme.spacing(3),
                        paddingLeft: theme.spacing(1),
                    }}
                >
                    {props.otherFilter}
                </Grid>
            )}
            {/*  */}
            <Grid
                container
                style={{
                    overflow: 'auto',
                }}
            >
                <TableContainer
                    style={{
                        overflow: 'auto',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {props.column.map((item) =>
                                    item.isDisplay ? (
                                        <TableCell>
                                            {item.isSort ? (
                                                <Button
                                                    className={classes.buttonHeader}
                                                    onClick={(e) => changeSort(item.id as string)}
                                                >
                                                    {item.label}
                                                    {componentSort(item.id as string)}
                                                </Button>
                                            ) : (
                                                <Grid className={classes.headerNotSort}>
                                                    <Typography variant="button" className={classes.buttonHeader}>
                                                        {item.label}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </TableCell>
                                    ) : null,
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {datas.map((data: any) => (
                                <TableRow>
                                    {props.column.map((item) =>
                                        item.isDisplay ? (
                                            <TableCell
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 50,
                                                    background: 'none',
                                                }}
                                            >
                                                {_.get(data, item.id)}
                                            </TableCell>
                                        ) : null,
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {/*  */}
            <Grid className={classes.frPaging} justify="flex-end" container alignItems="center">
                <FormControl>
                    <Select
                        onChange={(e) => {
                            console.log('on change');

                            props.onQuery({
                                ...props.query,
                                pageSize: (e.target.value as number) || 5,
                            });
                        }}
                        value={props.query.pageSize || 5}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        {props.pageSize &&
                            props.pageSize.length > 0 &&
                            props.pageSize.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                </FormControl>
                <Pagination
                    style={{
                        paddingLeft: theme.spacing(3),
                    }}
                    count={props.data.totalPages}
                    onChange={(e, page) => {
                        props.onQuery({
                            ...props.query,
                            page: page,
                        });
                    }}
                    color="primary"
                />
            </Grid>
        </Grid>
    );
}
