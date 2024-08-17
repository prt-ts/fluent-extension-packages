import { createContext, ReactNode } from "react"
import { IEditor } from "roosterjs-content-model-types"

export type EditorContextType = {
    editor: IEditor | null
};

export const EditorContext = createContext<EditorContextType | null>(null);

interface EditorContextProviderProps {
    children: ReactNode;
    editor: IEditor | null;
}

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({ children, editor }) => {
    return (
        <EditorContext.Provider value={{ editor }}>
            {children}
        </EditorContext.Provider>
    );
};