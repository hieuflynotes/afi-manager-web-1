import React from 'react';

export class StringUtil {
    static getHighlightedText = (text?: string, highlight?: string) => {
        highlight = highlight?.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (highlight == null || highlight.length === 0 || text == null || text.length === 0) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => (
                    <span
                        key={i}
                        style={part.toLowerCase() === highlight?.toLowerCase() ? { backgroundColor: '#ffed59' } : {}}
                    >
                        {part}
                    </span>
                ))}
            </span>
        );
    };
    static upperCaseFirstChar = (string: string) => {
        let upperCaseFirstChar = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        return upperCaseFirstChar;
    };

    static formatterMoney = new Intl.NumberFormat('uk-EN', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
    });

    static nullOrEmpty = (text?: string) => {
        return text == null || text.trim().length === 0;
    };
    // formatterPhoneVN = (phone: string): string => {
    //     var pn = new PhoneNumber(phone || '', 'VN');
    //     return pn.getNumber('international');
    // };
}
