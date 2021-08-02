import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    makeStyles,
    Slide,
    FormControlLabel,
    TextField,
    Checkbox,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { UserAccount } from 'src/afi-manager-base-model/model/User';
import { history } from 'src/constants/RouterAuthen';
import * as Yup from 'yup';
import { userController } from '../controller';
import { Dispatch } from '../rematch/store';
import { useGlobalStyles } from '../theme/GlobalStyle';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        background: "url('https://devforum.info/DEMO/LoginForm1/bg.jpg')",
        backgroundSize: 'cover',
    },
    frLogin: {
        maxWidth: 820,
        // height : 320,
        background: 'white',
        padding: theme.spacing(6),
    },
    titleLogin: {
        fontWeight: 500,
        // borderLeft : `${1}px solid ${theme.palette.primary.main}`
    },
}));
const validate = Yup.object({
    username: Yup.string().required('Do not leave username blank'),
    password: Yup.string().required('Do not leave the password blank'),
    fullName: Yup.string().required('Do not leave the full name blank'),
    phoneNumber: Yup.string().required('Do not leave the phone number blank'),
    email: Yup.string().required('Do not leave the email blank'),
});
export default function Register() {
    const dispatch = useDispatch<Dispatch>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const formik = useFormik<UserAccount>({
        validationSchema: validate,
        initialValues: { password: '', username: '' },
        onSubmit: (values) => {
            userController
                .register({
                    ...values,
                })
                .then((res: any) => {
                    history.push('/login');
                    dispatch.notification.success('Register success, Login Now !!');
                })
                .catch((err) => {
                    setError('Username has register');
                    dispatch.notification.error('Username has register !!');
                });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched(_.mapValues(new UserAccount(), (values) => true));
    };
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Slide in={true} timeout={900} direction="down">
                <Grid className={classes.frLogin} container justify="center">
                    <Grid className={globalStyles.pp1} justify="center" container>
                        <Typography className={classes.titleLogin} variant="h4" color="primary" align="center">
                            Register
                        </Typography>
                        <Typography color="error" variant="caption">
                            {error}
                        </Typography>
                    </Grid>
                    <form
                        onSubmit={(e) => {
                            onSubmit();
                            e.preventDefault();
                            return false;
                        }}
                    >
                        <Grid container justify="center">
                            <Grid item xs={12} className={globalStyles.mm1}>
                                <TextField
                                    fullWidth
                                    label="Full name"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.fullName && formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} className={globalStyles.pp1}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} className={globalStyles.pp1}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} justify="center" className={globalStyles.pp1}>
                                <TextField
                                    fullWidth
                                    label="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                ></TextField>
                            </Grid>
                            <Grid item sm={6} xs={12} className={globalStyles.pp1}>
                                <TextField
                                    fullWidth
                                    label="password"
                                    name="password"
                                    value={formik.values.password}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                ></TextField>
                            </Grid>
                            <Grid container className={globalStyles.pp1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showPassword}
                                            onChange={(e) => {
                                                setShowPassword(e.target.checked as boolean);
                                            }}
                                        />
                                    }
                                    label="Show password"
                                />
                            </Grid>
                        </Grid>

                        <Grid container justify="center">
                            <Button
                                className={clsx(globalStyles.mm1, globalStyles.mt3)}
                                fullWidth
                                type={'submit'}
                                variant="contained"
                                color="primary"
                                // onClick={() => onSubmit()}
                            >
                                Register
                            </Button>
                            <Button
                                className={clsx(globalStyles.mm1)}
                                fullWidth
                                color="primary"
                                onClick={() => history.push('/login')}
                            >
                                Login
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Slide>
        </Grid>
    );
}
