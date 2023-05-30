import * as React from 'react'
import { useGridHeaderStyles } from './useGridHeaderStyles';
import { Divider } from '@fluentui/react-components';

export const GridHeader: React.FunctionComponent<{
    search?: React.ReactNode,
    title?: React.ReactNode,
    actionMenu?: React.ReactNode
}> = (props) => {

    // styles
    const styles = useGridHeaderStyles();

    // stores 
    const { search, title, actionMenu } = props

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchContainer}>
                {title}
            </div>
            <div className={styles.searchContainer}>
                {actionMenu}
                <Divider inset vertical className={styles.searchContainerDivider} />
                {search}
            </div>
        </div>
    )
} 
