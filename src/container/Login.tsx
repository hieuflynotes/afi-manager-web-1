import {
    Button,
    Grid,
    IconButton,
    makeStyles,
    Slide,
    TextField,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userController } from "../controller";
import { Dispatch } from "../rematch/store";
import { useGlobalStyles } from "../theme/GlobalStyle";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100vh",
        background: "url('https://devforum.info/DEMO/LoginForm1/bg.jpg')",
        backgroundSize: "cover",
    },
    frLogin: {
        width: 420,
        // height : 320,
        background: "white",
        padding: theme.spacing(6),
    },
    titleLogin: {
        fontWeight: 500,
        // borderLeft : `${1}px solid ${theme.palette.primary.main}`
    },
}));
const validate = Yup.object({
    username: Yup.string().required("Không được để trống tài khoản"),
    password: Yup.string().required("Không được để trống mật khẩu"),
});
export default function Login() {
    const dispatch = useDispatch<Dispatch>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const formik = useFormik<{ username: string; password: string }>({
        validationSchema: validate,
        initialValues: { password: "", username: "" },
        onSubmit: (values) => {
            userController
                .login({
                    password: values.password,
                    username: values.username,
                })
                .then((res) => {
                    // dispatch.authen
                    //     .login({
                    //         info: res,
                    //         jwt: res.jwt,
                    //         isAuthenticated: true,
                    //         isAuthor: res.role === "admin" ? true : false,
                    //     })
                    //     .then((res1) => {
                    //         const link =
                    //             res.role === "admin"
                    //                 ? "admin/dashboard"
                    //                 : "gift-card";
                    //         window.location.href = link;
                    //         // history.push(link)
                    //     });
                })
                .catch((err) => {
                    setError("Tài khoản hoặc mật khẩu không đúng");
                });
        },
    });
    const onSubmit = () => {
        formik.handleSubmit();
        formik.setTouched({
            password: true,
            username: true,
        });
    };
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Slide in={true} timeout={900} direction="down">
                <Grid className={classes.frLogin} container>
                    <Grid className={globalStyles.pp1}>
                        <Typography
                            className={classes.titleLogin}
                            variant="h4"
                            color="primary"
                        >
                            Đăng nhập
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
                        <TextField
                            className={globalStyles.mm1}
                            fullWidth
                            label="Tài khoản"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                !!(
                                    formik.touched.username &&
                                    formik.errors.username
                                )
                            }
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        disabled
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <BsEyeSlash color="rgba(0,0,0,0)" />
                                    </IconButton>
                                ),
                            }}
                            helperText={
                                formik.touched.username &&
                                formik.errors.username
                            }
                        ></TextField>
                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            className={globalStyles.mm1}
                            name="password"
                            value={formik.values.password}
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <BsEye />
                                        ) : (
                                            <BsEyeSlash />
                                        )}
                                    </IconButton>
                                ),
                            }}
                            error={
                                !!(
                                    formik.touched.password &&
                                    formik.errors.password
                                )
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        ></TextField>
                        <Button
                            className={clsx(globalStyles.mm1, globalStyles.mt3)}
                            fullWidth
                            type={"submit"}
                            variant="contained"
                            color="primary"
                            // onClick={() => onSubmit()}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </Grid>
            </Slide>
        </Grid>
    );
}
