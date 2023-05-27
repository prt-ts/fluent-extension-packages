import {
    Skeleton,
    SkeletonItem,
} from "@fluentui/react-components";
import * as React from "react";
import { useLoadingStyles } from "./useLoadingStyles";

export const Loading: React.FC<{ }> = () => {
    const styles = useLoadingStyles();
    return (<div className={styles.invertedWrapper}>
        <Skeleton>
            {
                [...Array(12)].map(() => (<div className={styles.row}>
                    <SkeletonItem shape="circle" size={24} />
                    <SkeletonItem size={16} />
                    <SkeletonItem size={16} />
                    <SkeletonItem size={16} /> 
                </div>))
            }
        </Skeleton>
    </div>)
}