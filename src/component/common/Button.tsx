import { Button as ButtonMaterial, ButtonProps } from '@material-ui/core';
import React from 'react';
type Props<P = {}, D extends React.ElementType = 'button'> = {} & ButtonProps;
export default function Button(props: Props) {
    return <ButtonMaterial {...props}></ButtonMaterial>;
}
