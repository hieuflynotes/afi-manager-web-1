import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../theme/GlobalStyle';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { IconButton } from '@material-ui/core';
import { UserHm } from 'src/afi-manager-base-model/model/UserHm';
import TextDesc from '../common/TextDesc';
import moment from 'moment';
import { AiOutlineEdit, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import TextDescWithIcon from '../common/TextDescWithIcon';
import { VscHome } from 'react-icons/vsc';
import { BiKey, BiMap } from 'react-icons/bi';

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
        <Grid container className={clsx(classes.root)}>
            <Grid container alignItems="center" justify="space-between" className={globalStyle.pl1}>
                <Grid>
                    <Typography variant="caption">
                        {moment(props.item.createdAt).format('DD/MM/YYYY : hh:mm')}
                    </Typography>
                </Grid>
                <Grid>
                    <Grid container>
                        <Grid>
                            <IconButton onClick={(e) => props.onDelete(props.item)}>
                                <IoCloseOutline />
                            </IconButton>
                        </Grid>
                        <Grid>
                            <IconButton onClick={(e) => props.onEdit(props.item)}>
                                <AiOutlineEdit />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid>
                    <TextDescWithIcon desc={props.item.username} variant="h6" icon={<AiOutlineUser />} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid>
                    <TextDescWithIcon desc={props.item.password} variant="caption" icon={<BiKey />} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid>
                    <TextDescWithIcon desc={props.item.address} icon={<VscHome />} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid>
                    <TextDescWithIcon desc={props.item.address2} icon={<VscHome />} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid>
                    <TextDescWithIcon desc={props.item.phone} icon={<AiOutlinePhone />} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={6}>
                    <Grid container>
                        <Grid>
                            <TextDescWithIcon desc={props.item.town} icon={<BiMap />} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid container>
                        <Grid>
                            <TextDescWithIcon desc={props.item.postcode} icon={<BiMap />} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={6}>
                    <Grid container>
                        <Grid>
                            <TextDescWithIcon desc={`First: ${props.item.firstName}`} icon={<AiOutlineUser />} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid container>
                        <Grid>
                            <TextDescWithIcon desc={`Last: ${props.item.lastName}`} icon={<AiOutlineUser />} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={globalStyle.pp1}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    onClick={(e) => props.onSeeDetail(props.item)}
                >
                    See detail
                </Button>
            </Grid>
        </Grid>
    );
}

export default React.memo(UserHmItemList);
