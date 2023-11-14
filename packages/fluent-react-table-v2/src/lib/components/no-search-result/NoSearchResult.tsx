import * as React from "react";
import { useNoFilterMatchStyles } from "./useNoSearchResultStyles";
import { Subtitle2Stronger } from "@fluentui/react-components";
import { DocumentSearch24Regular } from "@fluentui/react-icons"

export const NoSearchResult: React.FC<{ message?: React.ReactNode }> = ({ message }) => {
    const styles = useNoFilterMatchStyles();
    return (<div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
            <DocumentSearch24Regular />
        </div>
        <div>
            {message ? message : <Subtitle2Stronger>No item found that matches your search term.</Subtitle2Stronger>}
        </div>
    </div>)
}