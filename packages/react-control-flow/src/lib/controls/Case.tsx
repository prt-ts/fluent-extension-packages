import type { ReactNode } from "react";
import { ConditionClause } from "../types/ConditionalClause";

type CaseProps = {
    children: ReactNode;
    value?: ConditionClause | ConditionClause[]; 
}

export const Case = ({ children }: CaseProps): JSX.Element | null => (
    <> {children} </>
);