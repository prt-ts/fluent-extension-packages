
// import { redo, undo } from 'roosterjs-content-model-core';
// import { setShortcutIndentationCommand } from './utils/setShortcutIndentationCommand';
// import {
//     changeFontSize,
//     clearFormat,
//     toggleBold,
//     toggleBullet,
//     toggleItalic,
//     toggleNumbering,
//     toggleUnderline,
// } from 'roosterjs-content-model-api';
// import type { ShortcutCommand } from './ShortcutCommand';

// const enum Keys {
//     BACKSPACE = 8,
//     SPACE = 32,
//     B = 66,
//     I = 73,
//     U = 85,
//     Y = 89,
//     Z = 90,
//     COMMA = 188,
//     PERIOD = 190,
//     FORWARD_SLASH = 191,
//     ArrowRight = 39,
//     ArrowLeft = 37,
// }

// /**
//  * Shortcut command for Bold
//  * Windows: Ctrl + B
//  * MacOS: Meta + B
//  */
// export const ShortcutBold: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.B,
//     },
//     onClick: editor => toggleBold(editor),
// };

// /**
//  * Shortcut command for Italic
//  * Windows: Ctrl + I
//  * MacOS: Meta + I
//  */
// export const ShortcutItalic: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.I,
//     },
//     onClick: editor => toggleItalic(editor),
// };

// /**
//  * Shortcut command for Underline
//  * Windows: Ctrl + U
//  * MacOS: Meta + U
//  */
// export const ShortcutUnderline: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.U,
//     },
//     onClick: editor => toggleUnderline(editor),
// };

// /**
//  * Shortcut command for Clear Format
//  * Windows: Ctrl + Space
//  * MacOS: N/A
//  */
// export const ShortcutClearFormat: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.SPACE,
//     },
//     onClick: editor => clearFormat(editor),
//     environment: 'nonMac',
// };

// /**
//  * Shortcut command for Undo 1
//  * Windows: Ctrl + Z
//  * MacOS: Meta + Z
//  */
// export const ShortcutUndo: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.Z,
//     },
//     onClick: editor => undo(editor),
// };

// /**
//  * Shortcut command for Undo 2
//  * Windows: Alt + Backspace
//  * MacOS: N/A
//  */
// export const ShortcutUndo2: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'alt',
//         shiftKey: false,
//         which: Keys.BACKSPACE,
//     },
//     onClick: editor => undo(editor),
//     environment: 'nonMac',
// };

// /**
//  * Shortcut command for Redo 1
//  * Windows: Ctrl + Y
//  * MacOS: N/A
//  */
// export const ShortcutRedo: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.Y,
//     },
//     onClick: editor => redo(editor),
//     environment: 'nonMac',
// };

// /**
//  * Shortcut command for Redo 2
//  * Windows: N/A
//  * MacOS: Meta + Shift + Z
//  */
// export const ShortcutRedoMacOS: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: true,
//         which: Keys.Z,
//     },
//     onClick: editor => redo(editor),
//     environment: 'mac',
// };

// /**
//  * Shortcut command for Bullet List
//  * Windows: Ctrl + . (Period)
//  * MacOS: Meta + . (Period)
//  */
// export const ShortcutBullet: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.PERIOD,
//     },
//     onClick: editor => toggleBullet(editor),
// };

// /**
//  * Shortcut command for Numbering List
//  * Windows: Ctrl + / (Forward slash)
//  * MacOS: Meta + / (Forward slash)
//  */
// export const ShortcutNumbering: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: false,
//         which: Keys.FORWARD_SLASH,
//     },
//     onClick: editor => toggleNumbering(editor),
// };

// /**
//  * Shortcut command for Increase Font
//  * Windows: Ctrl + Shift + . (Period)
//  * MacOS: Meta + Shift + . (Period)
//  */
// export const ShortcutIncreaseFont: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: true,
//         which: Keys.PERIOD,
//     },
//     onClick: editor => changeFontSize(editor, 'increase'),
// };

// /**
//  * Shortcut command for Decrease Font
//  * Windows: Ctrl + Shift + , (Comma)
//  * MacOS: Meta + Shift + , (Comma)
//  */
// export const ShortcutDecreaseFont: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'ctrl',
//         shiftKey: true,
//         which: Keys.COMMA,
//     },
//     onClick: editor => changeFontSize(editor, 'decrease'),
// };

// /**
//  * Shortcut command for Intent list
//  * Windows: Alt + Shift + Arrow Right
//  * MacOS: N/A
//  */
// export const ShortcutIndentList: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'alt',
//         shiftKey: true,
//         which: Keys.ArrowRight,
//     },
//     onClick: editor => {
//         setShortcutIndentationCommand(editor, 'indent');
//     },
//     environment: 'nonMac',
// };

// /**
//  * Shortcut command for Outdent list
//  * Windows: Alt + Shift + Arrow Left
//  * MacOS: N/A
//  */
// export const ShortcutOutdentList: ShortcutCommand = {
//     shortcutKey: {
//         modifierKey: 'alt',
//         shiftKey: true,
//         which: Keys.ArrowLeft,
//     },
//     onClick: editor => {
//         setShortcutIndentationCommand(editor, 'outdent');
//     },
//     environment: 'nonMac',
// };


export function EditorShortcutDoc() {
  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Editor Shortcut</h2>
      <p>
        Editor shortcut is a feature that allows you to define a set of key combinations to execute a specific command.
        Editor has a set of built-in shortcut commands that you can use while editing text
      </p>
      <p>
        The following is a list of built-in shortcut commands:
      </p>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Shortcut</th>
            <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + B</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Bold text</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + I</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Italic text</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + U</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Underline text</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Space</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Clear format</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Z</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Undo</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Y</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Undo</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Shift + Z</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Redo (Windows)</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Command + Shift + Z</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Redo (MacOS)</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Shift + L</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Bullet list</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Shift + N</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Numbering list</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Shift + &gt;</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Increase font size</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + Shift + &lt;</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Decrease font size</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + ]</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Indent list</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + [</code></td>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Outdent list</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}