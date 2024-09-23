import {
  Button,
  Divider,
  Input,
  InputProps,
  tokens,
} from '@fluentui/react-components';
import {
  Attach24Regular,
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

type ChatInputValue = {
  message: InputProps['value'];
};

type ChatInputProps = {
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit?: (value: ChatInputValue) => void;
};

const baseStyle = {
  borderWidth: 0,
  borderRadius: 4,
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  boxSizing: 'border-box',
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

  // dropzone files
  const filesList = files.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

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
              <span> </span>
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
      <ul>{filesList}</ul>
    </>
  );
};
