import { FormControlLabel, Grid, makeStyles, Switch, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderTracking } from 'src/afi-manager-base-model/model/OrderTracking';
import Button from '../../component/common/Button';
import { useGlobalStyles } from '../../theme/GlobalStyle';

type Props = {
    item: OrderTracking;
    updateOrder: (item: OrderTracking) => void;
};
type State = {
    isDisable: boolean;
    orderTracking?: OrderTracking;
};
const useStyle = makeStyles((theme) => ({}));
function FixSwithUpdateOrder(props: Props) {
    const history = useHistory();

    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState<State>({
        isDisable: true,
        orderTracking: undefined,
    });
    const [isDisable, setDisble] = useState<boolean>(true);

    const updateDisable = (item: OrderTracking) => {
        setDisble(false);
    };

    useEffect(() => {
        setState({
            ...state,
            orderTracking: props.item,
        });
        setDisble(true);
        setTimeout(updateDisable, 6000);
        return () => {};
    }, []);

    return (
        <Grid container>
            <Grid container justify="space-around" alignItems="center">
                {
                    <FormControlLabel
                        control={
                            <Switch
                                checked={state.orderTracking?.isRegister || false}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        orderTracking: {
                                            ...state.orderTracking,
                                            isRegister: e.target.checked,
                                            isOrder: e.target.checked == true ? state.orderTracking?.isOrder : false,
                                        },
                                    })
                                }
                            />
                        }
                        label="Is register"
                    />
                }
                {
                    <FormControlLabel
                        control={
                            <Switch
                                checked={state.orderTracking?.isOrder || false}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        orderTracking: {
                                            ...state.orderTracking,
                                            isOrder: e.target.checked,
                                        },
                                    })
                                }
                            />
                        }
                        label="Is order"
                    />
                }

                <Button
                    variant="outlined"
                    onClick={() => {
                        state.orderTracking && props.updateOrder(state.orderTracking);
                    }}
                    color="secondary"
                    disabled={isDisable}
                >
                    {isDisable ? 'Vui lòng kiểm tra kĩ' : 'Update'}
                </Button>
            </Grid>
            <Grid className={globalStyle.pp3}>
                <Typography>* Because data anh hưởng to all system, Please check kỹ cái này </Typography>
                <Typography>* Please, kiểm tra lại chính xác data trước khi update</Typography>
                <Typography>* You will chịu trách nhiệm cho mọi action của you </Typography>
            </Grid>
        </Grid>
    );
}

export default FixSwithUpdateOrder;
