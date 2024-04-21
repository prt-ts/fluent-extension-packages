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
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + . (dot)</code></td>
            <td style={{ backgroundColor: "#fff", padding: "8px", border: "1px solid #ddd" }}>Bullet list</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}><code>Ctrl + / (slash)</code></td>
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