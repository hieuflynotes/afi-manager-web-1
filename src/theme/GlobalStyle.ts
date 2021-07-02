import { makeStyles } from "@material-ui/core/styles";
import color from "../constants/Color";

export const useGlobalStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(15),
		marginBottom: theme.spacing(12),
		display: "flex",
		justifyContent: "center",
		flex: 1,
	},
	section: {
		marginTop: theme.spacing(5),
		width: "100%",
	},
	sectionLanding: {
		marginTop: theme.spacing(10),
		width: "100%",
	},
	title: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	paragraph: {
		marginBottom: theme.spacing(3),
	},
	buttomActionButton: {
		marginTop: theme.spacing(6),
	},
	highlightSearchText: {
		background: "yellow",
	},
	content: {
		minHeight: "100vh",
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	borderLeft: {
		borderLeft: "1px solid",
		borderColor: theme.palette.grey[100],
	},
	btnRefresh: {
		position: "absolute",
		top: theme.spacing(-1),
		right: theme.spacing(-2),
	},
	contentItem: {
		padding: theme.spacing(3),
		border: theme.spacing(1),
		borderWidth: "1px",
		borderColor: theme.palette.grey[300],
		borderStyle: "solid",
		borderRadius: "10px",
		// boxSizing: "borderBox"
	},
	flexLeft: {
		display: "flex",
		alignItems: "center",
	},
	alignItemCenter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	justifySpaceBetween: {
		display: "flex",
		justifyContent: "space-between",
	},
	justifyEnd: {
		justifyContent: "flex-end",
	},
	grid2: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: theme.spacing(2),
	},
	buttonAlert: {
		color: "#fff",
		backgroundColor: theme.palette.error.main,
		borderColor: theme.palette.error.main,
		"&:hover": {
			backgroundColor: theme.palette.error.dark,
			borderColor: theme.palette.error.dark,
		},
	},
	iconButtonAlert: {
		color: theme.palette.error.main,
		borderColor: theme.palette.error.main,
		// "&:hover": {
		//     color: theme.palette.error.dark,
		// }
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.error.main,
			borderColor: theme.palette.error.main,
			border: "1px solid",
		},
	},
	buttonPrimaryLink: {
		...(theme.overrides?.MuiButton &&
			theme.overrides?.MuiButton.root &&
			theme.overrides?.MuiButton.root),
		color: color.white,
		backgroundColor: theme.palette.primary.main,
		"&:hover": {
			textDecoration: "none",
			color: color.white,
			borderColor: theme.palette.primary.dark,
			backgroundColor: theme.palette.primary.dark,
		},
	},
	buttonSecondaryLink: {
		...(theme.overrides?.MuiButton &&
			theme.overrides?.MuiButton.root &&
			theme.overrides?.MuiButton.root),
		color: color.white,
		backgroundColor: theme.palette.secondary.main,
		"&:hover": {
			textDecoration: "none",
			color: color.white,
			borderColor: theme.palette.secondary.dark,
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	buttonProgress: {
		color: theme.palette.primary.main,
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
	popUp: {
		padding: theme.spacing(3),
	},
	mb0: {
		marginBottom: theme.spacing(0),
	},
	mb1: {
		marginBottom: theme.spacing(1),
	},
	mb2: {
		marginBottom: theme.spacing(2),
	},
	mb3: {
		marginBottom: theme.spacing(3),
	},
	mb4: {
		marginBottom: theme.spacing(4),
	},
	mb5: {
		marginBottom: theme.spacing(5),
	},
	mb6: {
		marginBottom: theme.spacing(6),
	},
	mb7: {
		marginBottom: theme.spacing(7),
	},
	mb8: {
		marginBottom: theme.spacing(8),
	},
	mr0: {
		marginRight: theme.spacing(0),
	},
	mr1: {
		marginRight: theme.spacing(1),
	},
	mr2: {
		marginRight: theme.spacing(2),
	},
	mr3: {
		marginRight: theme.spacing(3),
	},
	mr4: {
		marginRight: theme.spacing(4),
	},
	mr5: {
		marginRight: theme.spacing(5),
	},
	mr6: {
		marginRight: theme.spacing(6),
	},
	mr7: {
		marginRight: theme.spacing(8),
	},
	mr8: {
		marginRight: theme.spacing(8),
	},
	mt0: {
		marginTop: theme.spacing(0),
	},
	mt1: {
		marginTop: theme.spacing(1),
	},
	mt2: {
		marginTop: theme.spacing(2),
	},
	mt3: {
		marginTop: theme.spacing(3),
	},
	mt4: {
		marginTop: theme.spacing(4),
	},
	mt5: {
		marginTop: theme.spacing(5),
	},
	mt6: {
		marginTop: theme.spacing(6),
	},
	mt7: {
		marginTop: theme.spacing(7),
	},
	mt8: {
		marginTop: theme.spacing(8),
	},
	ml0: {
		marginLeft: theme.spacing(0),
	},
	ml1: {
		marginLeft: theme.spacing(1),
	},
	ml2: {
		marginLeft: theme.spacing(2),
	},
	ml3: {
		marginLeft: theme.spacing(3),
	},
	ml4: {
		marginLeft: theme.spacing(4),
	},
	ml5: {
		marginLeft: theme.spacing(5),
	},
	ml6: {
		marginLeft: theme.spacing(6),
	},
	ml7: {
		marginLeft: theme.spacing(7),
	},
	ml8: {
		marginLeft: theme.spacing(8),
	},
	m0: {
		margin: theme.spacing(0),
	},
	m1: {
		margin: theme.spacing(1),
	},
	m2: {
		margin: theme.spacing(2),
	},
	m3: {
		margin: theme.spacing(3),
	},
	m4: {
		margin: theme.spacing(4),
	},
	m5: {
		margin: theme.spacing(5),
	},
	m6: {
		margin: theme.spacing(6),
	},
	m7: {
		margin: theme.spacing(7),
	},
	m8: {
		margin: theme.spacing(8),
	},
	pb0: {
		paddingBottom: theme.spacing(0),
	},
	pb1: {
		paddingBottom: theme.spacing(1),
	},
	pb2: {
		paddingBottom: theme.spacing(2),
	},
	pb3: {
		paddingBottom: theme.spacing(3),
	},
	pb4: {
		paddingBottom: theme.spacing(4),
	},
	pb5: {
		paddingBottom: theme.spacing(5),
	},
	pb6: {
		paddingBottom: theme.spacing(6),
	},
	pb7: {
		paddingBottom: theme.spacing(7),
	},
	pb8: {
		paddingBottom: theme.spacing(8),
	},
	pr0: {
		paddingRight: theme.spacing(0),
	},
	pr1: {
		paddingRight: theme.spacing(1),
	},
	pr2: {
		paddingRight: theme.spacing(2),
	},
	pr3: {
		paddingRight: theme.spacing(3),
	},
	pr4: {
		paddingRight: theme.spacing(4),
	},
	pr5: {
		paddingRight: theme.spacing(5),
	},
	pr6: {
		paddingRight: theme.spacing(6),
	},
	pr7: {
		paddingRight: theme.spacing(7),
	},
	pr8: {
		paddingRight: theme.spacing(8),
	},
	pt0: {
		paddingTop: theme.spacing(0),
	},
	pt1: {
		paddingTop: theme.spacing(1),
	},
	pt2: {
		paddingTop: theme.spacing(2),
	},
	pt3: {
		paddingTop: theme.spacing(3),
	},
	pt4: {
		paddingTop: theme.spacing(4),
	},
	pt5: {
		paddingTop: theme.spacing(5),
	},
	pt6: {
		paddingTop: theme.spacing(6),
	},
	pt7: {
		paddingTop: theme.spacing(7),
	},
	pt8: {
		paddingTop: theme.spacing(8),
	},
	pl0: {
		paddingLeft: theme.spacing(0),
	},
	pl1: {
		paddingLeft: theme.spacing(1),
	},
	pl2: {
		paddingLeft: theme.spacing(2),
	},
	pl3: {
		paddingLeft: theme.spacing(3),
	},
	pl4: {
		paddingLeft: theme.spacing(4),
	},
	pl5: {
		paddingLeft: theme.spacing(5),
	},
	pl6: {
		paddingLeft: theme.spacing(6),
	},
	pl7: {
		paddingLeft: theme.spacing(7),
	},
	pl8: {
		paddingLeft: theme.spacing(8),
	},
	pp0: {
		padding: theme.spacing(0),
	},
	pp1: {
		padding: theme.spacing(1),
	},
	pp2: {
		padding: theme.spacing(2),
	},
	pp3: {
		padding: theme.spacing(3),
	},
	pp4: {
		padding: theme.spacing(4),
	},
	pp5: {
		padding: theme.spacing(5),
	},
	pp6: {
		padding: theme.spacing(6),
	},
	pp7: {
		padding: theme.spacing(7),
	},
	pp8: {
		padding: theme.spacing(8),
	},
	selectSmall: {
		"& .MuiOutlinedInput-input": {
			fontSize: "0.85rem",
			lineHeight: "1.5rem",
			padding: "0.75rem 1rem",
			paddingRight: "32px",
			minWidth: "150px",
		},
	},
	breakLongText: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		wordBreak: "break-word",
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
	},
}));
