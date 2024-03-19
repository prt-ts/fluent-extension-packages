import React, { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";
import { Case } from "./Case";

type SwitchProps = {
    when?: ConditionClause;
    children: JSX.Element | ReactNode | null;
    fallback?: JSX.Element | null;
}

/*eslint-disable */
export const Switch = (props: SwitchProps): JSX.Element | null => {
    const { when, children, fallback =  null} = props;

    const cases = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Case
    );
    const successCase = cases.find((child) => {
        if (!React.isValidElement(child)) return false;
        if (Array.isArray(child.props.value)) return child.props.value.includes(when);
        return child.props.value === when;
    });

    if (!successCase) {
        return <>{fallback}</>;
    }

    return <>{successCase}</>;
};

