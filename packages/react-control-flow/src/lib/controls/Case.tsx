import { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";

type CaseProps = {
    children: JSX.Element | ReactNode | null;
    value?: ConditionClause | ConditionClause[]; 
}

/*eslint-disable */
export const Case = ({ children }: CaseProps): JSX.Element | null => <>{children}</>;