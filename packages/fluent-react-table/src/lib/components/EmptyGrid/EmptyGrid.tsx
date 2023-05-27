import * as React from "react";
import { useEmptyGridStyles } from "./useEmptyGridStyles";
import { Subtitle2Stronger } from "@fluentui/react-components";

export const EmptyGrid: React.FC<{ message?: React.ReactNode }> = ({ message }) => {
    const styles = useEmptyGridStyles();
    return (<div className={styles.wrapper}>
        <div>Sth</div>
        <div> 
            {message ? message : <Subtitle2Stronger>No Item Found that matches your search term.</Subtitle2Stronger>}
        </div>
    </div>)
}