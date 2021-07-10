import React from "react";

export class StringUtil {
    static getHighlightedText = (text?: string, highlight?: string) => {
        highlight = highlight?.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (
            highlight == null ||
            highlight.length === 0 ||
            text == null ||
            text.length === 0
        )
            return text;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, i) => (
                    <span
                        key={i}
                        style={
                            part.toLowerCase() === highlight?.toLowerCase()
                                ? { backgroundColor: "#ffed59" }
                                : {}
                        }
                    >
                        {part}
                    </span>
                ))}
            </span>
        );
    };
    static upperCaseFirstChar = (string: string) => {
        let upperCaseFirstChar =
            string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        return upperCaseFirstChar;
    };
}
