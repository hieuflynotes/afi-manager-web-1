import { Button, Chip, Grid, IconButton, makeStyles, Slide, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from 'src/constants/RouterAuthen';
import * as Yup from 'yup';
import { localStoryController, userController } from '../controller';
import { Dispatch, RootState } from '../rematch/store';
import { useGlobalStyles } from '../theme/GlobalStyle';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        background: "url('https://devforum.info/DEMO/LoginForm1/bg.jpg')",
        backgroundSize: 'cover',
    },
}));

export default function LoginWithCode() {
    const { code } = useParams<{ code: string }>();
    useEffect(() => {
        const converToJwt = code.split('aleafi').join('.');
        localStorage.setItem('jwt', converToJwt);
        window.location.href = '/login';
    }, []);
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    return <Grid container justify="center" alignItems="center" className={classes.root}></Grid>;
}
