import { Popover, PopoverTrigger, Button, PopoverSurface, Input, tokens, MenuButtonProps, SplitButton } from '@fluentui/react-components';
import { ImageRegular } from '@fluentui/react-icons';
import React from 'react';
import { insertImage } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';

export interface InsertImageButtonProps {
    editor: IEditor;
    handleChange: () => void;
}

export const InsertImageButton: React.FC<InsertImageButtonProps> = ({ editor, handleChange }) => {

    const imageUrlRef = React.useRef<HTMLInputElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const styles = useIconStyles();
    return (
        <>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => {
                    const selectedFile = Array.from(e.target.files ?? []);
                    if (selectedFile?.length) {
                        for (const file of selectedFile) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                insertImage(editor, reader.result as string);
                                handleChange?.();
                            };
                        }
                        // clear the input file
                        setTimeout(() => {
                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                        }, 2000);
                    }
                }} />
            <Popover trapFocus>
                <PopoverTrigger disableButtonEnhancement>
                    {(triggerProps: MenuButtonProps) => (
                        <SplitButton
                            menuButton={triggerProps}
                            aria-label="Insert Link"
                            // menuIcon={<ImageRegular className={styles.icon} />} 
                            primaryActionButton={{
                                icon: <ImageRegular className={styles.icon} />,
                                size: 'small',
                                onClick: () => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.click();
                                    }
                                }
                            }}
                        >

                        </SplitButton>
                    )}
                </PopoverTrigger>

                <PopoverSurface>
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingHorizontalS }}>
                        <Input ref={imageUrlRef} type="text" placeholder="Image URL" />
                        <Button
                            size='small'
                            onClick={() => {
                                const imageUrl = imageUrlRef.current?.value;
                                if (imageUrl) {
                                    insertImage(editor, imageUrl);
                                    handleChange?.();
                                }
                            }}>Load image from web</Button>
                    </div>
                </PopoverSurface>
            </Popover>
        </>
    );
}