import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import Button from 'src/component/common/Button';
import config from 'src/constants/Config';
import { useSelector } from 'react-redux';
import { RootState } from 'src/rematch/store';

type Props = {};
function RedirectToSystemSalesManager(props: Props) {
    const [state, setState] = useState();
    const jwt = localStorage.getItem('jwt');
    const codeLogin = jwt?.split('.').join('aleafi');
    const linkToSaleManager = `${config.redirectToSaleManager}/loginWithCode/${codeLogin}`;
    useEffect(() => {
        global?.open(linkToSaleManager, '_blank')?.focus();
        return () => {};
    }, []);

    return (
        <Grid
            container
            style={{
                flex: 1,
                height: '90%',
            }}
            justifyContent="center"
            alignContent="center"
        >
            <Button
                color="primary"
                variant="contained"
                href={linkToSaleManager}
                {...({ target: '_blank', rel: 'noopener noreferrer' } as any)}
            >
                Chuyển hướng đế trang bán hàng
            </Button>
        </Grid>
    );
}

export default React.memo(RedirectToSystemSalesManager);
