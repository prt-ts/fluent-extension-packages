import {
    Skeleton,
    SkeletonItem,
} from "@fluentui/react-components";
import * as React from "react";
import { useLoadingStyles } from "./useLoadingStyles";

type LoadingProps = {
    numberOfItems?: number,
    numberOfColumns?: number,
}

export const Loading: React.FC<LoadingProps> = (props) => {
    const { numberOfItems = 16, numberOfColumns = 5 } = props;
    const styles = useLoadingStyles();
    return (<div className={styles.invertedWrapper}>
        <Skeleton>
            {
                [...Array(numberOfItems)].map((_, i) => (<div key={i} className={styles.row}>
                    {
                        [...Array(numberOfColumns)].map((_, i) => {
                            if (i === 0) {
                                return <SkeletonItem key={i} shape="circle" size={24} />
                            }
                            return <SkeletonItem key={i} size={16} />
                        })
                    }
                </div>))
            }
        </Skeleton>
    </div>)
}