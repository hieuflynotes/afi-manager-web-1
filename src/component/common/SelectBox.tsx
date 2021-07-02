import {
	FormControl,
	FormControlTypeMap,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import { OverrideProps } from "@material-ui/core/OverridableComponent";
import React from "react";
type Props<
	T = any,
	D extends React.ElementType = FormControlTypeMap["defaultComponent"],
	P = {}
> = {
	label?: string;
	data: T[];
	value?: any;
	labelOption: (items: T) => string;
	valueOption: (items: T) => any;
	onChange: (items: T) => void;
} & OverrideProps<FormControlTypeMap<P, D>, D>;
export default function SelectBox(props: Props) {
	return (
		<FormControl {...props}>
			<InputLabel>{props.label || "label"}</InputLabel>
			<Select
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				label={props.label || "label"}
			>
				{props.data.map((item) => (
					<MenuItem value={props.valueOption(item)}>
						{props.labelOption(item)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
