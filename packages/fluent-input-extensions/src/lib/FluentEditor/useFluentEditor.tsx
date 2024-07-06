import * as React from 'react';
import { FluentEditorProps, FontSizeOption } from './FluentEditorTypes';
import {
  FieldControlProps,
  TextareaProps,
  tokens,
  useId,
} from '@fluentui/react-components';
import {
  DOMEventRecord,
  EditorOptions,
  EditorPlugin,
  IEditor,
} from 'roosterjs-content-model-types';
import {
  Editor,
  createModelFromHtml,
  exportContent,
} from 'roosterjs-content-model-core';
import {
  TableEditPlugin,
  ShortcutPlugin,
  WatermarkPlugin,
  AutoFormatPlugin,
  PastePlugin,
  HyperlinkPlugin,
  MarkdownPlugin,
  ImageEditPlugin,
  EditPlugin,
} from 'roosterjs-content-model-plugins';

function defaultEditorCreator(
  div: HTMLDivElement,
  options: EditorOptions
): IEditor {
  return new Editor(div, options);
}

export function useFluentEditor(
  props: FluentEditorProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    props.value
  );

  const {
    value,
    focusOnInit,
    onChange,
    onBlur,
    ribbonPosition = 'bottom',
    size = 'small',
    showRibbon = true,
    ...rest
  } = props;

  const { ...textareaProps } = rest as unknown as TextareaProps;
  const { ...fieldProps } = rest as unknown as FieldControlProps;

  const { disabled, readOnly } = textareaProps;

  const id = useId('editorDiv');

  const editor = React.useRef<IEditor | null>(null);
  const editorDiv = React.useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = React.useState(false);

  /* eslint-disable-next-line */
  React.useImperativeHandle(ref, () => editorDiv.current!);

  const handleChange = () => {
    if (editor?.current) {
      try {
        if (!editor?.current?.isDisposed()) {
          let newValue = exportContent(editor.current);
          if (newValue === '<br>' || newValue === '<div><br></div>') {
            newValue = '';
          }
          onChange && onChange?.(newValue);
          setInternalValue(newValue);
        }
      } catch (error) {
        // console.error("Error in handleChange", error);
      }
    }
  };

  const handleFocus = () => {
    setHasFocus(true);
    handleChange();
  };

  const handleBlur = (e: React.FocusEvent) => {
    setHasFocus(false);
    handleChange();
    onBlur && onBlur(e);
  };

  React.useEffect(
    () => {
      if (editorDiv.current) {
        const plugins: EditorPlugin[] = [
          new EditPlugin({
            handleTabKey: false,
          }),
          new TableEditPlugin(),
          new ShortcutPlugin(),
          new WatermarkPlugin(`${props.placeholder || ''}`, {
            fontSize: tokens.fontSizeBase300,
            textColor: tokens.colorNeutralForeground3,
          }),
          new ImageEditPlugin(),
          new AutoFormatPlugin({
            autoBullet: true,
            autoLink: true,
            autoNumbering: true,
            autoUnlink: true,
            autoHyphen: true,
          }),
          new PastePlugin(),
          new HyperlinkPlugin(
            (url: string, anchor: HTMLAnchorElement) => {
              anchor.title = url;

              if (url.length > 2) {
                url = url.substring(0, 2) + '...';
              }

              return url;
            },
            '_blank',
            (anchor: HTMLAnchorElement, mouseEvent: MouseEvent) => {
              if (anchor.href.startsWith('mailto:')) {
                window.location.href = anchor.href;
              } else {
                window.open(anchor.href, '_blank');
              }
              return true;
            }
          ),
          new MarkdownPlugin({
            bold: true,
            italic: true,
            strikethrough: true,
          }),
        ];

        const defaultEditor = defaultEditorCreator(editorDiv.current, {
          initialModel: createModelFromHtml(props.value || ''),
          plugins: plugins,
          defaultSegmentFormat: {
            fontSize: FontSizeOption[size] || '9pt',
            fontFamily: 'Segoe UI',
            textColor: tokens.colorNeutralForeground1,
            backgroundColor: tokens.colorNeutralBackground1,
            fontWeight: tokens.fontWeightRegular,
            italic: false,
            underline: false,
            strikethrough: false,
            letterSpacing: 'normal',
            lineHeight: 'normal',
            superOrSubScriptSequence: 'normal',
          },
        });

        // attach event to default editor
        const domEvent: Record<string, DOMEventRecord> = {
          input: {
            pluginEventType: 'input',
            beforeDispatch: () => {
              if (editor?.current) {
                try {
                  if (!editor?.current?.isDisposed()) {
                    setInternalValue(() =>
                      exportContent(editor.current as IEditor)
                    );
                  }
                } catch (error) {
                  // console.error("Error in handleChange", error);
                }
              }
            },
          },
        };
        defaultEditor.attachDomEvent(domEvent);
        defaultEditor.setDarkModeState(false);
        editor.current = defaultEditor;

        if (focusOnInit) {
          defaultEditor?.focus();
        }
      }

      return () => {
        if (!editor?.current?.isDisposed()) {
          editor?.current?.dispose();
          editor.current = null;
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // if value changes, update the editor
  React.useEffect(
    () => {
      if (editor.current && value !== undefined && value !== null) {
        const newModel = createModelFromHtml(value);
        editor.current.formatContentModel((model) => {
          if (value !== internalValue) {
            model.blocks = newModel.blocks;
            setInternalValue(value);
            return true;
          }
          return false;
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, editor]
  );

  const showPlaceholder = React.useMemo(() => {
    return (
      !internalValue ||
      internalValue === '<br>' ||
      internalValue === '<div><br></div>'
    );
  }, [internalValue]);

  const showRibbonAll = showRibbon && !disabled && !readOnly;

  return {
    id,
    editorDiv,
    textareaProps,
    fieldProps,
    showPlaceholder,
    hasFocus,
    handleChange,
    handleFocus,
    handleBlur,
    showRibbonAll,
    ribbonPosition,
    size,
    editor,
    internalValue,
    setInternalValue,
    defaultEditorCreator,
    focusOnInit,
    disabled,
    readOnly,
    ...rest,
  } as const;
}
