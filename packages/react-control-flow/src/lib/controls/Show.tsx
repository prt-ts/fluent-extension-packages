import type { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";

interface ShowProps {
    when: ConditionClause;
    children: JSX.Element | string | null;
    fallback?: JSX.Element | string | null;
}
export const Show = (props: ShowProps): ReactNode | null => {
    const { when = false, children = null, fallback = null } = props;
    if (!when) {
        return fallback;
    }
    return children;
};