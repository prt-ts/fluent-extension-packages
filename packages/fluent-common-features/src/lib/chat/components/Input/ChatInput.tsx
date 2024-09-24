import {
  Button,
  Card,
  CardHeader,
  Divider,
  Input,
  InputProps,
  tokens,
  Text,
} from '@fluentui/react-components';
import {
  Attach24Regular,
  Dismiss24Filled,
  Mic24Filled,
  Mic24Regular,
  SendRegular,
  Settings24Regular,
} from '@fluentui/react-icons';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ChatSetting } from './ChatSetting';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import { Show } from '@prt-ts/react-control-flow';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

type ChatInputValue = {
  message: InputProps['value'];
};

type ChatInputProps = {
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit?: (value: ChatInputValue) => void;
  contextSuggestions?: string[];
};

const baseStyle = {
  borderWidth: 0,
  borderRadius: 4,
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground1Hover,
};

const focusedStyle = {
  borderColor: tokens.colorBrandBackground2Hover,
  borderWidth: 1,
};

const acceptStyle = {
  borderColor: tokens.colorBrandBackground2Hover,
  borderWidth: 1,
};

const rejectStyle = {
  borderColor: tokens.colorBrandBackground2Hover,
  borderWidth: 1,
};

const knownFileTypes = [
  'docs',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'pdf',
  'txt',
];

export const ChatInput: React.FC<ChatInputProps> = (props) => {
  const { value, onChange, onSubmit } = props;

  const [message, setMessage] = useState(value);
  const handleChange = (e: ChangeEvent<HTMLInputElement>, data) => {
    setMessage(data.value);
  };
  const [files, setFiles] = useState<File[]>([]);

  // dropzone
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: true,
  });

  const handleRemoveFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f.name !== file.name));
  };

  // dropzone files
  const filesList = files.map((file) => {
    const fileExtension = file.name.split('.').pop() || '';
    const assetName = knownFileTypes?.includes(fileExtension)
      ? `${fileExtension}.png`
      : 'docs.png';
    return (
      <Card
        key={file.name}
        appearance="outline"
        floatingAction={
          <Button
            appearance="subtle"
            icon={<Dismiss24Filled />}
            onClick={() => handleRemoveFile(file)}
          />
        }
        style={{
          flex: '0 0 auto',
        }}
      >
        <CardHeader
          image={<img src={resolveAsset(assetName)} alt="" />}
          header={<Text weight="semibold">{file.name}</Text>}
          description={<Text italic>{file.size} bytes</Text>}
          style={{ paddingRight: '3rem' }}
        />
      </Card>
    );
  });

  // dropzone files
  React.useEffect(() => {
    setFiles((prev) => {
      // get unique files
      const newFiles = acceptedFiles.filter(
        (file) => !prev.some((f) => f.name === file.name)
      );
      return [...prev, ...newFiles];
    });
  }, [acceptedFiles]);

  // dropzone styles
  const style = useMemo(
    () =>
      ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as React.CSSProperties),
    [isFocused, isDragAccept, isDragReject]
  );

  //ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    onSubmit?.({ message: value });
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      inputRef.current?.focus();
      setMessage(result);
    },
    onEnd: () => {
      console.log('end');
    },
  });
  const { speak, supported: isSpeakSupported } = useSpeechSynthesis();

  return (
    <>
      <div>
        listen: {listening ? 'on' : 'off'}
        supported: {supported ? 'yes' : 'no'}
        <Show when={isSpeakSupported}>
          <button onClick={() => speak({ text: value })}>Speak</button>
        </Show>
      </div>
      <div {...getRootProps({ style })}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflow: 'auto',
              padding: '10px',
              // min-height: min-content; /* needs vendor prefixes */
              minHeight: 'min-content',
            }}
          >
            {filesList}
          </div>
        </div>
        <input {...getInputProps()} />
        <Input
          ref={inputRef}
          value={message}
          onChange={handleChange} // check if key is enter and shift is not pressed, then submit the message
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          appearance="filled-darker"
          contentAfter={
            <>
              <Divider vertical />
              <Button
                appearance="subtle"
                icon={<SendRegular />}
                onClick={handleSubmit}
                aria-label="Send"
              />
              <Show when={supported}>
                <Button
                  appearance="subtle"
                  icon={listening ? <Mic24Filled /> : <Mic24Regular />}
                  onClick={() => {
                    const handle = listening ? stop : listen;
                    handle();
                  }}
                  aria-label="Record"
                />
              </Show>
              <ChatSetting />
            </>
          }
          contentBefore={
            <>
              <Button
                appearance="subtle"
                icon={<Attach24Regular />}
                onClick={open}
                aria-label="Attach"
              />
            </>
          }
          style={{
            minHeight: '60px',
            minWidth: '100%',
          }}
        />
      </div>
    </>
  );
};
