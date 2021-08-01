import React from 'react';

type Props = {
    children: React.ReactElement[] | React.ReactElement | undefined;
    gridGap?: number;
    minWidthItem?: string;
    heightItem?: string;
};
export default function ListGrid(props: Props) {
    return (
        <div
            style={{
                width: '100%',
                display: 'grid',
                gridGap: props.gridGap || 0,
                gridTemplateColumns: `repeat(auto-fit, minmax(${props.minWidthItem || '100px'}, 1fr))`,
                gridTemplateRows: `repeat(auto, ${props.heightItem || '100px'} )`,
            }}
        >
            {props.children}
        </div>
    );
}
