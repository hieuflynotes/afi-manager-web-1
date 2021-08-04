import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { IconButton } from '@material-ui/core';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import TextDesc from '../common/TextDesc';
import moment from 'moment';
import { AiOutlineEdit } from 'react-icons/ai';

type Props = {
    item: UserHm;
    onEdit: (item: UserHm) => void;
    onDelete: (item: UserHm) => void;
    onSeeDetail: (item: UserHm) => void;
};
const useStyle = makeStyles((theme) => ({
    root: {
        // width: 300,
        borderRadius: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
    },
}));
function UserHmItemList(props: Props) {
    const classes = useStyle();
    const [state, setState] = useState();
    const globalStyle = useGlobalStyles();
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid container justify="center" className={clsx(classes.root)}>
            <Grid container alignItems="center" justify="space-between">
                <Grid>
                    <Typography variant="caption">
                        {moment(props.item.createdAt).format('DD/MM/YYYY : hh:mm')}
                    </Typography>
                </Grid>
                <Grid>
                    <Grid container>
                        <Grid>
                            <IconButton>
                                <IoCloseOutline />
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton>
                                <AiOutlineEdit />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography variant="h6">{props.item.username}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(UserHmItemList);
