import { Popover, PopoverTrigger, Button, PopoverSurface, Input, tokens } from '@fluentui/react-components';
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

    const [imageUrl, setImageUrl] = React.useState<string>("");
    const [selectedFile, setSelectedFile] = React.useState<File[]>([]);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const styles = useIconStyles();
    return (
        <Popover>
            <PopoverTrigger disableButtonEnhancement>
                <Button
                    aria-label="Insert Link"
                    icon={<ImageRegular className={styles.icon} />}
                    size="small"
                />
            </PopoverTrigger>

            <PopoverSurface>
                <div style={{ display: "flex", gap: tokens.spacingHorizontalS }}>
                    <input ref={fileInputRef}
                        type="file"
                        accept="image/*" 
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                setSelectedFile(Array.from(files));
                            }
                        }} />

                        <span> --- OR ---</span>

                    <Input type="text" placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} />
                    <Button
                        onClick={() => {
                            for (const file of selectedFile) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    insertImage(editor, reader.result as string);
                                    handleChange?.();
                                };
                            }

                            if (imageUrl) {
                                insertImage(editor, imageUrl);
                                handleChange?.();
                            }
                            setTimeout(() => {
                                setImageUrl("");
                                setSelectedFile([]);
                                // clear the input file
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }, 1000);
                        }}>Insert</Button>
                </div>
            </PopoverSurface>
        </Popover>
    );

}