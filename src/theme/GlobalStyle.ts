import { makeStyles } from "@material-ui/core/styles";
import color from "../constants/Color";

export const useGlobalStyles = makeStyles((theme) => ({
    container: {
        marginTop: `${theme.spacing(15)}px !important`,
        marginBottom: `${theme.spacing(12)}px !important`,
        display: "flex",
        justifyContent: "center",
        flex: 1,
    },
    section: {
        marginTop: `${theme.spacing(5)}px !important`,
        width: "100%",
    },
    sectionLanding: {
        marginTop: `${theme.spacing(10)}px !important`,
        width: "100%",
    },
    title: {
        marginTop: `${theme.spacing(3)}px !important`,
        marginBottom: `${theme.spacing(3)}px !important`,
    },
    paragraph: {
        marginBottom: `${theme.spacing(3)}px !important`,
    },
    buttomActionButton: {
        marginTop: `${theme.spacing(6)}px !important`,
    },
    highlightSearchText: {
        background: "yellow",
    },
    content: {
        minHeight: "100vh",
        paddingLeft: `${theme.spacing(4)}px !important`,
        paddingRight: `${theme.spacing(4)}px !important`,
    },
    borderLeft: {
        borderLeft: "1px solid",
        borderColor: theme.palette.grey[100],
    },
    borderRight: {
        borderRight: "1px solid",
        borderColor: theme.palette.grey[100],
    },
    borderTop: {
        borderTop: "1px solid",
        borderColor: theme.palette.grey[100],
    },
    borderBottom: {
        borderBottom: "1px solid",
        borderColor: theme.palette.grey[100],
    },
    btnRefresh: {
        position: "absolute",
        top: theme.spacing(-1),
        right: theme.spacing(-2),
    },
    contentItem: {
        padding: `${theme.spacing(3)}px !important`,
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
    popUp: {
        padding: `${theme.spacing(3)}px !important`,
    },
    mm0: {
        margin: `${theme.spacing(0)}px !important`,
    },
    mm1: {
        margin: `${theme.spacing(1)}px !important`,
    },
    mm2: {
        margin: `${theme.spacing(2)}px !important`,
    },
    mm3: {
        margin: `${theme.spacing(3)}px !important`,
    },
    mm4: {
        margin: `${theme.spacing(4)}px !important`,
    },
    mm5: {
        margin: `${theme.spacing(5)}px !important`,
    },
    mm6: {
        margin: `${theme.spacing(6)}px !important`,
    },
    mm7: {
        margin: `${theme.spacing(7)}px !important`,
    },
    mm8: {
        margin: `${theme.spacing(8)}px !important`,
    },
    mb0: {
        marginBottom: `${theme.spacing(0)}px !important`,
    },
    mb1: {
        marginBottom: `${theme.spacing(1)}px !important`,
    },
    mb2: {
        marginBottom: `${theme.spacing(2)}px !important`,
    },
    mb3: {
        marginBottom: `${theme.spacing(3)}px !important`,
    },
    mb4: {
        marginBottom: `${theme.spacing(4)}px !important`,
    },
    mb5: {
        marginBottom: `${theme.spacing(5)}px !important`,
    },
    mb6: {
        marginBottom: `${theme.spacing(6)}px !important`,
    },
    mb7: {
        marginBottom: `${theme.spacing(7)}px !important`,
    },
    mb8: {
        marginBottom: `${theme.spacing(8)}px !important`,
    },
    mr1: {
        marginRight: `${theme.spacing(1)}px !important`,
    },
    mr2: {
        marginRight: `${theme.spacing(2)}px !important`,
    },
    mr3: {
        marginRight: `${theme.spacing(3)}px !important`,
    },
    mr4: {
        marginRight: `${theme.spacing(4)}px !important`,
    },
    mr5: {
        marginRight: `${theme.spacing(5)}px !important`,
    },
    mt0: {
        marginTop: `${theme.spacing(0)}px !important`,
    },
    mt1: {
        marginTop: `${theme.spacing(1)}px !important`,
    },
    mt2: {
        marginTop: `${theme.spacing(2)}px !important`,
    },
    mt3: {
        marginTop: `${theme.spacing(3)}px !important`,
    },
    mt4: {
        marginTop: `${theme.spacing(4)}px !important`,
    },
    mt5: {
        marginTop: `${theme.spacing(5)}px !important`,
    },
    mt6: {
        marginTop: `${theme.spacing(5)}px !important`,
    },
    mt7: {
        marginTop: `${theme.spacing(5)}px !important`,
    },
    mt8: {
        marginTop: `${theme.spacing(5)}px !important`,
    },
    ml1: {
        marginLeft: `${theme.spacing(1)}px !important`,
    },
    ml2: {
        marginLeft: `${theme.spacing(2)}px !important`,
    },
    ml3: {
        marginLeft: `${theme.spacing(3)}px !important`,
    },
    ml4: {
        marginLeft: `${theme.spacing(4)}px !important`,
    },
    ml5: {
        marginLeft: `${theme.spacing(5)}px !important`,
    },
    pp0: {
        padding: `${theme.spacing(0)}px !important`,
    },
    pp1: {
        padding: `${theme.spacing(1)}px !important`,
    },
    pp2: {
        padding: `${theme.spacing(2)}px !important`,
    },
    pp3: {
        padding: `${theme.spacing(3)}px !important`,
    },
    pp4: {
        padding: `${theme.spacing(4)}px !important`,
    },
    pp5: {
        padding: `${theme.spacing(5)}px !important`,
    },
    pp6: {
        padding: `${theme.spacing(6)}px !important`,
    },
    pp7: {
        padding: `${theme.spacing(7)}px !important`,
    },
    pp8: {
        padding: `${theme.spacing(8)}px !important`,
    },
    pb0: {
        paddingBottom: `${theme.spacing(0)}px !important`,
    },
    pb1: {
        paddingBottom: `${theme.spacing(1)}px !important`,
    },
    pb2: {
        paddingBottom: `${theme.spacing(2)}px !important`,
    },
    pb3: {
        paddingBottom: `${theme.spacing(3)}px !important`,
    },
    pb4: {
        paddingBottom: `${theme.spacing(4)}px !important`,
    },
    pb5: {
        paddingBottom: `${theme.spacing(5)}px !important`,
    },
    pb6: {
        paddingBottom: `${theme.spacing(6)}px !important`,
    },
    pb7: {
        paddingBottom: `${theme.spacing(7)}px !important`,
    },
    pb8: {
        paddingBottom: `${theme.spacing(8)}px !important`,
    },
    pr0: {
        paddingRight: `${theme.spacing(0)}px !important`,
    },
    pr1: {
        paddingRight: `${theme.spacing(1)}px !important`,
    },
    pr2: {
        paddingRight: `${theme.spacing(2)}px !important`,
    },
    pr3: {
        paddingRight: `${theme.spacing(3)}px !important`,
    },
    pr4: {
        paddingRight: `${theme.spacing(4)}px !important`,
    },
    pr5: {
        paddingRight: `${theme.spacing(5)}px !important`,
    },
    pt0: {
        paddingTop: `${theme.spacing(0)}px !important`,
    },
    pt1: {
        paddingTop: `${theme.spacing(1)}px !important`,
    },
    pt2: {
        paddingTop: `${theme.spacing(2)}px !important`,
    },
    pt3: {
        paddingTop: `${theme.spacing(3)}px !important`,
    },
    pt4: {
        paddingTop: `${theme.spacing(4)}px !important`,
    },
    pt5: {
        paddingTop: `${theme.spacing(5)}px !important`,
    },
    pl0: {
        paddingLeft: `${theme.spacing(0)}px !important`,
    },
    pl1: {
        paddingLeft: `${theme.spacing(1)}px !important`,
    },
    pl2: {
        paddingLeft: `${theme.spacing(2)}px !important`,
    },
    pl3: {
        paddingLeft: `${theme.spacing(3)}px !important`,
    },
    pl4: {
        paddingLeft: `${theme.spacing(4)}px !important`,
    },
    pl5: {
        paddingLeft: `${theme.spacing(5)}px !important`,
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
