import { useMediaQuery } from "@material-ui/core";
import { useEffect } from "react";
import theme from "../theme/MuiTheme";

export function useMediaQueryHook(props : PropsUseQueryHook) {
    const upXs = useMediaQuery(theme.breakpoints.up("xs"));
    const upSm = useMediaQuery(theme.breakpoints.up("sm"));
    const upMd = useMediaQuery(theme.breakpoints.up("md"));
    const upLg = useMediaQuery(theme.breakpoints.up("lg"));
    const upHipi = useMediaQuery(theme.breakpoints.up("hidpi"));
    const upXl = useMediaQuery(theme.breakpoints.up("xl"));

    const downXs = useMediaQuery(theme.breakpoints.down("xs"));
    const downSm = useMediaQuery(theme.breakpoints.down("sm"));
    const downMd = useMediaQuery(theme.breakpoints.down("md"));
    const downLg = useMediaQuery(theme.breakpoints.down("lg"));
    const downHipi = useMediaQuery(theme.breakpoints.down("hidpi"));
    const downXl = useMediaQuery(theme.breakpoints.down("xl"));

    useEffect(() => props.onUpXs && (!!upXs as any) && props.onUpXs(), [upXs]);
    useEffect(() => props.onUpSm && (!!upSm as any) && props.onUpSm(), [upSm]);
    useEffect(() => props.onUpMd && (!!upMd as any) && props.onUpMd(), [upMd]);
    useEffect(() => props.onUpLg && (!!upLg as any) && props.onUpLg(), [upLg]);
    useEffect(
        () => props.onUpHidpi && (!!upHipi as any) && props.onUpHidpi(),
        [upHipi]
    );
    useEffect(() => props.onUpXl && (!!upXl as any) && props.onUpXl(), [upXl]);
    useEffect(
        () => props.onDownXs && (!!downXs as any) && props.onDownXs(),
        [downXs]
    );
    useEffect(
        () => props.onDownSm && (!!downSm as any) && props.onDownSm(),
        [downSm]
    );
    useEffect(
        () => props.onDownMd && (!!downMd as any) && props.onDownMd(),
        [downMd]
    );
    useEffect(
        () => props.onDownLg && (!!downLg as any) && props.onDownLg(),
        [downLg]
    );
    useEffect(
        () => props.onDownHidpi && (!!downHipi as any) && props.onDownHidpi(),
        [downHipi]
    );
    useEffect(
        () => props.onDownXl && (!!downXl as any) && props.onDownXl(),
        [downXl]
    );
}

type PropsUseQueryHook = {
    onUpXs?: () => void;
    onUpSm?: () => void;
    onUpMd?: () => void;
    onUpLg?: () => void;
    onUpHidpi?: () => void;
    onUpXl?: () => void;
    onDownXs?: () => void;
    onDownSm?: () => void;
    onDownMd?: () => void;
    onDownLg?: () => void;
    onDownHidpi?: () => void;
    onDownXl?: () => void;
};
