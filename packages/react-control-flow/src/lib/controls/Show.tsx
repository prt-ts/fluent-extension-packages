import { ConditionClause } from "../types/ConditionalClause";

interface ShowProps {
    when: ConditionClause;
    children: JSX.Element | JSX.Element[] | null;
    fallback?: JSX.Element | null;
}
/* eslint-disable */
export const Show = (props: ShowProps): JSX.Element | JSX.Element[] | null => {
    const { when = false, children = null, fallback = null } = props;
    if (!when) {
        return fallback as JSX.Element | null;
    }
    return children as JSX.Element | JSX.Element[] | null;
};