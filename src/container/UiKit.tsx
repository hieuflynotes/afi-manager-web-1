import { Grid, makeStyles, Typography, Divider, withStyles } from '@material-ui/core';
import React from 'react';
import Button from '../component/common/Button';
import { FiSave } from 'react-icons/fi';
import TextField from '../component/common/TextFiled';
import SelectBox from '../component/common/SelectBox';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import NavBar from '../component/common/NavBar';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 10,
        margin: 10,
    },
    gridLayout: {
        '& > *': {
            margin: 10,
        },
    },
}));

const MyGrid = withStyles((theme) => ({
    root: {
        padding: 10,
    },
}))(Grid);
export default function UiKit() {
    const classes = useStyle();
    return (
        <MyGrid>
            <MyGrid className={classes.root}>
                <Typography variant="h3" align="center">
                    Button
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <Button>Normal</Button>
                    <Button variant="contained">Container</Button>
                    <Button variant="outlined">Container</Button>
                    <Button color="primary" variant="contained">
                        Container
                    </Button>
                    <Button color="primary" variant="outlined">
                        Container
                    </Button>
                    <Button color="secondary" variant="contained">
                        Container Sc
                    </Button>
                    <Button size="large" color="primary" variant="contained">
                        Container Large
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                        Container Medium
                    </Button>
                    <Button size="small" color="primary" variant="contained">
                        Container Small
                    </Button>
                    <Button color="primary" variant="contained" startIcon={<FiSave />}>
                        Container Small
                    </Button>
                    <Button color="primary" variant="contained" endIcon={<FiSave />}>
                        Container Small
                    </Button>
                </MyGrid>
            </MyGrid>
            <Divider></Divider>
            <MyGrid className={classes.root}>
                <Typography align="center" variant="h3">
                    Input
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <TextField label="Label" />
                    <TextField variant="outlined" label="Label" />
                    <TextField variant="filled" label="Label" />
                </MyGrid>
            </MyGrid>
            <Divider></Divider>
            <MyGrid className={classes.root}>
                <Typography align="center" variant="h3">
                    Typography
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <Typography variant="h1">
                        h1-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="h2">
                        h2-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="h3">
                        h3-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="h4">
                        h4-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="h5">
                        h5-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="h6">
                        h6-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography>
                        normal-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="body1">
                        body1-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="body2">
                        body2-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="button">
                        button-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <br />
                    <Typography variant="caption">
                        caption-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <br />
                    <Typography variant="overline">
                        overline-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="srOnly">
                        srOnly-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="subtitle1">
                        subtitle1-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                    <Typography variant="subtitle2">
                        subtitle2-----Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, laudantium!
                    </Typography>
                </MyGrid>
            </MyGrid>
            <Divider></Divider>
            <MyGrid className={classes.root}>
                <Typography align="center" variant="h3">
                    Input
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <SelectBox
                        data={[
                            { value: 1, label: 'One' },
                            { value: 2, label: 'Two' },
                            { value: 3, label: 'Three' },
                        ]}
                        value={2}
                        labelOption={(e) => e.label}
                        onChange={(e: any) => {}}
                        valueOption={(e) => e.value}
                        variant={'outlined'}
                    />
                </MyGrid>
            </MyGrid>
            <Divider></Divider>
            <MyGrid className={classes.root}>
                <Typography align="center" variant="h3">
                    Input
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="DateTimePicker"
                            inputVariant="outlined"
                            value={new Date()}
                            onChange={(e) => {}}
                        />

                        <DateTimePicker
                            autoOk
                            ampm={false}
                            disableFuture
                            value={new Date()}
                            onChange={(e) => {}}
                            label="24h clock"
                        />

                        <DateTimePicker
                            disablePast
                            value={new Date()}
                            onChange={(e) => {}}
                            label="With Today Button"
                            showTodayButton
                        />
                    </MuiPickersUtilsProvider>
                </MyGrid>
            </MyGrid>
            <Divider></Divider>

            <MyGrid className={classes.root}>
                <Typography align="center" variant="h3">
                    Table
                </Typography>
                <MyGrid className={classes.gridLayout}>
                    <TextField />
                </MyGrid>
            </MyGrid>
            <Divider></Divider>
        </MyGrid>
    );
}
