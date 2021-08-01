import { Slider, withStyles } from '@material-ui/core';
import React from 'react';

const MyPrettoSlider = withStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        height: 8,
    },
    thumb: {
        height: 0,
        width: 0,
        backgroundColor: '#fff',
        // border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        // borderRadius: 4,
    },
    rail: {
        height: 8,
        // borderRadius: 4,
    },
}))(Slider);
type Props = {
    total?: number;
    value: number;
};
export default function PrettoSlider(props: Props) {
    const value = (props.value * 100) / (props.total || 100);
    return <MyPrettoSlider value={value}></MyPrettoSlider>;
}
