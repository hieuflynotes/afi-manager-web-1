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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: color.primary,
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
    },
    typography: {
        htmlFontSize: 14,
        fontSize: 14,
        fontFamily: `"Poppins", sans-serif`,
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.85rem',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
    },
    spacing: 8,
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                lineHeight: '2rem',
                height: 'fit-content',
                borderRadius: '5px',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover  .MuiSvgIcon-root': {
                    padding: '0.125rem',
                    fontSize: '2rem',
                },
            },
            contained: {
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                lineHeight: '2rem',
                boxShadow: 'none',
                backgroundColor: color.lightDark1,
                color: color.lightDark2,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: color.lightDark1,
                '&:hover': {
                    boxShadow: 'none',
                    color: color.primary,
                    borderColor: color.primary,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    backgroundColor: color.white,
                },
                '&.Mui-disabled': {
                    backgroundColor: '#F3F3F3',
                    borderColor: '#F3F3F3',
                    color: '#A6A6A6',
                },
            },
            outlined: {
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                lineHeight: '2rem',
            },
            containedSecondary: {
                color: color.white,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: color.secondary,
                '&:hover': {
                    boxShadow: 'none',
                    color: color.white,
                    borderColor: color.darkSecondary,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    backgroundColor: color.darkSecondary,
                },
            },
            containedPrimary: {
                color: color.white,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: color.primary,
                '&:hover': {
                    boxShadow: 'none',
                    color: color.white,
                    borderColor: color.darkPrimary,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    backgroundColor: color.darkPrimary,
                },
            },
            outlinedPrimary: {
                '&:hover': {
                    backgroundColor: color.primary,
                    color: color.white,
                },
            },
            outlinedSecondary: {
                '&:hover': {
                    backgroundColor: color.secondary,
                    color: color.white,
                },
            },
            textSizeSmall: {
                fontSize: '0.85rem',
                lineHeight: '1.25rem',
                padding: '0.75rem 1rem',
                '&:hover  .MuiSvgIcon-root': {
                    padding: '0.125rem',
                    fontSize: '1.5rem',
                },
            },
            sizeSmall: {
                fontSize: '0.85rem',
                lineHeight: '1.25rem',
                padding: '0.75rem 1rem',
                '&:hover  .MuiSvgIcon-root': {
                    padding: '0.125rem',
                    fontSize: '1.5rem',
                },
            },
            sizeLarge: {
                fontSize: '1rem',
                padding: '1rem 2rem',
                '&:hover  .MuiSvgIcon-root': {
                    padding: '0.125rem',
                    fontSize: '2rem',
                },
            },
            textSizeLarge: {
                fontSize: '1rem',
                padding: '1rem 2rem',
            },
            containedSizeSmall: {
                fontSize: '0.85rem',
                padding: '0.75rem 1rem',
            },
            containedSizeLarge: {
                fontSize: '1rem',
                padding: '0.75rem 2rem',
            },

            iconSizeMedium: {
                '& *:first-child': {
                    fontSize: '2rem',
                    padding: '0.25rem',
                },
            },
            iconSizeSmall: {
                '& *:first-child': {
                    fontSize: '1.5rem',
                    padding: '0.25rem',
                },
            },
            iconSizeLarge: {
                '& *:first-child': {
                    fontSize: '2rem',
                    padding: '0.25rem',
                },
            },
            startIcon: {
                marginRight: '4px',
            },
        },
        MuiTypography: {
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
            },
            body2: {
                fontSize: '0.85rem',
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 500,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 500,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 500,
            },
            h3: {
                fontSize: '2rem',
                fontWeight: 500,
            },
            h2: {
                fontSize: '3rem',
                fontWeight: 500,
            },
            subtitle2: {
                fontSize: '1rem',
                fontWeight: 500,
            },
        },
        MuiInputBase: {
            input: {
                height: 'fit-content',
            },
        },
        MuiOutlinedInput: {
            inputMarginDense: {
                paddingTop: '1rem',
                paddingRight: '1rem',
            },
            input: {
                padding: '1.25rem 1rem',
                fontSize: '1rem',
                lineHeight: '1rem',
                height: 'calc(1rem + 1px)',
            },
        },
        MuiInputLabel: {
            outlined: {
                transform: 'translate(14px, 1.25rem) scale(1)',
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
