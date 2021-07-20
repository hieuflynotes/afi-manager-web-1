import { createMuiTheme } from '@material-ui/core';
import { CreateCSSProperties, CSSProperties } from '@material-ui/styles';
import color from '../constants/Color';
declare module '@material-ui/core/styles/createBreakpoints' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        hidpi: true;
        xl: true;
    }
}
const spacing = 8;
const baseHeaderTypography: CSSProperties | CreateCSSProperties<{}> = {
    fontWeight: 600,
    marginBottom: '.5rem',
    lineHeight: 1.2,
};
// fontFamily: [
// 	'-apple-system',
// 	'BlinkMacSystemFont',
// 	'"Segoe UI"',
// 	'Roboto',
// 	'"Helvetica Neue"',
// 	'Arial',
// 	'sans-serif',
// 	'"Apple Color Emoji"',
// 	'"Segoe UI Emoji"',
// 	'"Segoe UI Symbol"',
//   ].join(',')
const theme = createMuiTheme({
    breakpoints: {
        // values: {
        // 	xs: 0,
        // 	sm: 600,
        // 	md: 960,
        // 	lg: 1280,
        // 	hidpi: 1440,
        // 	xl: 1920,
        // },
    },
    palette: {
        background: {
            default: '#f1f4f6',
            paper: 'white',
        },
        primary: {
            main: color.primary,
            dark: color.darkPrimary,
        },
        secondary: {
            main: color.secondary,
        },
        warning: {
            main: color.warning,
        },
        success: {
            main: color.success,
        },
        error: {
            main: color.error,
        },
        text: {
            hint: 'black',
        },
    },
    spacing: 8,
    overrides: {
        MuiButton: {
            root: {
                fontSize: '1rem',
                borderRadius: spacing / 2,
                transition: '0.5s',
                fontWeight: 540,
                textTransform: 'none',
                padding: '0.5rem 1.5rem',
                '&:hover': {
                    letterSpacing: 1,
                },
                '&.MuiButton-startIcon': {
                    overflow: 'hidden',
                },
                '&:hover .MuiButton-startIcon > * , &:hover .MuiButton-endIcon>*': {
                    transition: '0.5s',
                    padding: 0.5,
                    fontSize: '1.4rem',
                },
            },
            outlined: {
                padding: spacing + '0.1',
                borderWidth: 1,
            },
            outlinedPrimary: {
                '&:after': {
                    transition: '0.5s',
                    backgroundColor: color.primary,
                    content: "''",
                    bottom: '0%',
                    left: '0%',
                    position: 'absolute',
                    width: '0%',
                    height: '100%',
                    zIndex: -1,
                    borderRadius: '0% 80%',
                },
                transformOrigin: '20 30',
                '&:hover': {
                    color: 'white',
                },
                '&:hover:after': {
                    borderRadius: '0%',
                    width: '100%',
                },
            },
        },
        MuiTypography: {
            root: {},
            h1: {
                ...baseHeaderTypography,
                fontSize: 'calc(1.475rem + 1.5vw)',
            },
            h2: {
                ...baseHeaderTypography,
                fontSize: 'calc(1.325rem + .9vw)',
            },
            h3: {
                ...baseHeaderTypography,
                fontSize: 'calc(1.3rem + .6vw)',
            },
            h4: {
                ...baseHeaderTypography,
                fontSize: 'calc(1.275rem + .3vw)',
            },
            h5: {
                ...baseHeaderTypography,
                fontSize: '1.25rem',
            },
            h6: {
                ...baseHeaderTypography,
                fontSize: '1.1rem',
            },
            body2: {
                fontWeight: 650,
            },
            button: {},
            caption: {},
            overline: {},
            srOnly: {},
            subtitle1: {
                fontStyle: 'italic',
            },
            subtitle2: {
                color: '#6c757d',
            },
        },
        MuiTextField: {
            root: {},
        },
        MuiOutlinedInput: {
            root: {
                '&.Mui-focused fieldset': {
                    // border : 'none',
                    // width : '91%',
                    // transition: "0.3s",
                    position: 'absolute',
                    '&:after': {
                        content: "''",
                        // background : "red",
                        width: '100%',
                        height: '150%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 100,
                    },
                },
            },
        },
        MuiInputBase: {},
        MuiInput: {},
        MuiDialog: {
            root: {
                borderRadius: spacing,
            },
        },
        MuiTableBody: {
            root: {
                '& tr:nth-child(even)': {
                    background: '#f5f5f5',
                },
            },
        },
        MuiTableCell: {
            root: {
                '&:first-child': {
                    // paddingLeft: 30,
                },
            },
            head: {
                fontWeight: 400,
                '&(:first-child)': {
                    textAlign: 'left',
                },
                '&:not(:first-child):not(:last-child)': {
                    textAlign: 'center',
                },
            },
            body: {
                color: color.textPrimary,
                fontWeight: 400,
                '&(:first-child)': {
                    textAlign: 'left',
                    paddingLeft: 5,
                },
                '&:not(:first-child):not(:last-child)': {
                    // textAlign: "center",
                },
            },
        },
        MuiTableRow: {
            root: {
                height: '65px',
                // "&:hover": {
                //     transition: "0.3s",
                //     height: "70px",
                // },
                '& #demo-simple-select-outlined': {
                    backgroundColor: 'red',
                    fontSize: '0.85rem',
                    lineHeight: '1.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                },
                '& .MuiTableCell-root': {
                    maxWidth: '300px',
                },
                '& .MuiChip-root': {
                    borderRadius: '4px',
                    backgroundColor: '#F0F0F0',
                    // margin: "8px 8px 8px 0",
                    height: 'fit-content',
                    padding: '4px 12px',
                    '& .MuiChip-label': {
                        lineHeight: '17px',
                        fontSize: '0.85rem',
                        color: color.textPrimary,
                    },
                },
            },
        },
    },
});

export default theme;
