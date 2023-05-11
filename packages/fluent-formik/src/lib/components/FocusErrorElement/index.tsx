import { formikConnect } from "./formikConnect";
import { FocusErrorProps, FocusError } from "./FocusError";

export const FocusConnectedError = formikConnect(FocusError);