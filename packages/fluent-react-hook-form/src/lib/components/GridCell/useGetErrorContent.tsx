import * as React from "react";
import { Button, Tooltip } from "@fluentui/react-components";
import { useFormContext } from "../Form/useFormContext";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";

export const useErrorStyles = makeStyles({
    error: {
        color: tokens.colorPaletteRedBackground3,
    }
});

export function useGetErrorContent(name: string) {

    const {
        form: { getFieldState }
    } = useFormContext();

    const fieldState = getFieldState(name);
    const error = fieldState?.error?.message;
    const styles = useErrorStyles()

    const errorContent = React.useMemo(() => {
        if (error) {
            return (
                <Tooltip
                    content={<span className={styles.error}>{error}</span>}
                    relationship="description">
                    <Button size="small" tabIndex={-1} icon={<ErrorCircleRegular primaryFill={tokens.colorPaletteRedBackground3} />} appearance="transparent" />
                </Tooltip>
            )
        }
        return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error]);

    return {
        hasError : fieldState.invalid,
        errorContent
    };
}