import { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";

interface ShowProps {
    when: ConditionClause;
    children: JSX.Element | JSX.Element[] | ReactNode | string | number | null;
    fallback?: JSX.Element | null;
}
/* eslint-disable */
export const Show = (props: ShowProps): JSX.Element | null => {
    const { when = false, children = null, fallback = null } = props;
    if (!when) {
        return <>{fallback}</>;
    }
    return <>{children}</>;
};