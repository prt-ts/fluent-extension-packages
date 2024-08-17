import React from 'react';
import { FluentEditorRibbon } from './Ribbon';
import { Show } from '@prt-ts/react-control-flow';
import { mergeClasses, tokens } from '@fluentui/react-components';
import { FluentEditorProps } from './FluentEditorTypes';
import { useEditorStyle } from './useFluentEditorStyles';
import { useFluentEditor } from './useFluentEditor';
import { IEditor } from 'roosterjs-content-model-types';
import { EditorContextProvider } from './context/EditorContext';

export const FluentEditor = React.forwardRef<HTMLDivElement, FluentEditorProps>(
  (props, ref) => {
    const {
      id,
      editorDiv,
      textareaProps,
      fieldProps,
      hasFocus,
      handleChange,
      handleFocus,
      handleBlur,
      showRibbonAll,
      ribbonPosition,
      size,
      editor,
      internalValue,
      disabled,
      readOnly,
    } = useFluentEditor(props, ref);

    const themeInfoStyles = {
      '--darkColor__ffffff': tokens.colorNeutralBackground1,
      '--darkColor__000000': tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForeground1,
      position: 'relative',

      ...(props.style || {}),
    } as React.CSSProperties;

    const styles = useEditorStyle();
    return (
      <EditorContextProvider editor={editor?.current}>
      <div
        className={mergeClasses(
          styles.root,
          hasFocus && styles.rootFocused,
          fieldProps['aria-invalid'] && !hasFocus && styles.invalid
        )}
      >
        <Show
          when={!!editor?.current && showRibbonAll && ribbonPosition === 'top'}
        >
          <div className={mergeClasses(styles[ribbonPosition])}>
            <FluentEditorRibbon
              editor={editor.current as IEditor}
              value={internalValue}
              handleChange={handleChange}
            />
          </div>
        </Show>
        <div
          id={id}
          {...(textareaProps as unknown as React.HTMLAttributes<HTMLDivElement>)}
          {...fieldProps}
          ref={editorDiv}
          tabIndex={0}
          className={mergeClasses(styles.editor, styles[size])}
          onBlur={handleBlur}
          onFocus={handleFocus}
          contentEditable={!disabled && !readOnly}
          style={themeInfoStyles}
        />
        <Show
          when={
            !!editor?.current && showRibbonAll && ribbonPosition === 'bottom'
          }
        >
          <div className={mergeClasses(styles[ribbonPosition])}>
            <FluentEditorRibbon
              editor={editor.current as IEditor}
              value={internalValue}
              handleChange={handleChange}
            />
          </div>
        </Show>
      </div>
      </EditorContextProvider>
    );
  }
);
