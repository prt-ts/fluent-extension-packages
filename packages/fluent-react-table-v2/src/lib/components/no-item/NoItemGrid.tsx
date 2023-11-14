import * as React from "react";
import { useNoItemGridStyles } from "./useNoItemGridStyles";
import { Subtitle2Stronger } from "@fluentui/react-components";

export const NoItemGrid: React.FC<{ message?: React.ReactNode }> = ({ message }) => {
    const styles = useNoItemGridStyles();
    return (<div className={styles.wrapper}>
        <div>
            {message ? message : <Subtitle2Stronger>No Data to Show.</Subtitle2Stronger>}
        </div>
    </div>)
}