import type { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";

interface ShowProps {
    when: ConditionClause;
    children: ReactNode | string | null;
    fallback?: JSX.Element | string | null;
}
export const Show = (props: ShowProps): JSX.Element | null => {
    const { when = false, children = null, fallback = null } = props;
    if (!when) {
        return <> {fallback} </>;
    }
    return (<> {children} </>);
};