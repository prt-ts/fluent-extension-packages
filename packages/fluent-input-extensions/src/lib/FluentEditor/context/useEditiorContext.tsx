import { useContext } from "react";
import { EditorContext } from "./EditorContext";

export function useEditorContext() {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be used within an EditorContextProvider");
    }
    return context;
}