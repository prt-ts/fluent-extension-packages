export type ChatInputValue = {
  message: string;
  attachments: File[];

  settings: {
    temperature: number;
    context: string;
    systemMessage: string;
  };
};
