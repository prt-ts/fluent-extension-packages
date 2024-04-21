import { toggleBold, toggleItalic } from "roosterjs-content-model-api"; 
import { EditorPlugin, IEditor, PluginEvent } from "roosterjs-content-model-types";

type RibbonPluginCallback = React.Dispatch<React.SetStateAction<number>>;

export class RibbonPlugin implements EditorPlugin {
    private editor: IEditor | null = null;
    private callback: RibbonPluginCallback;

    constructor() {
        this.editor = null;
        this.callback = () => null;
    }

    setCallback(callback: RibbonPluginCallback) {
        this.callback = callback;
    }

    getName() {
        return 'RibbonPlugin';
    }

    initialize(editor: IEditor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    onPluginEvent(event: PluginEvent) { 
        if (this.editor !== null &&
            (event.eventType === 'keyUp' ||
                event.eventType === 'mouseUp' ||
                event.eventType === 'input'
                // event.eventType === 'extractContentWithDom'
            )
        ) {

            if(!this.callback) {
                console.error('RibbonPlugin callback not set');
                return;
            }
             
            this.callback?.((oldValue) => oldValue + 1);
            // event.rawEvent?.preventDefault();
            console.log('RibbonPlugin onPluginEvent', event.eventType);
        }
    }

    toggleBold(editor: IEditor | null) {
        console.log('toggleBold', this.editor);
        this.editor = editor;
        if (this.editor !== null){
            toggleBold(this.editor);
        }
    }

    toggleItalic() {
        if (this.editor !== null)
            toggleItalic(this.editor);
    }
}