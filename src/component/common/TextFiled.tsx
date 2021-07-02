import {
	TextField as TextFieldMaterial,
	TextFieldProps,
} from "@material-ui/core";
import React from "react";
type Props = {} & TextFieldProps;
export default function TextField(props: Props) {
	return <TextFieldMaterial {...props}></TextFieldMaterial>;
}
