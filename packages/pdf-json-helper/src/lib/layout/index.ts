function getRows<T>(rows: T[]) {
    return {
        stack: [...rows],
    };
}

function getColumns<T>(columns: T[], columnGap = 10) {
    return {
        columnGap: columnGap ?? 10,
        columns: [...columns],
    };
}

function getSectionHeader(headerText: string) {
    return {
        stack: [
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: headerText,
                            },
                        ],
                    ],
                },
                style: "sectionHeaderStyle",
            },
        ],
    };
}

export {
    getRows,
    getColumns,
    getSectionHeader
}