export type ListSubscriptionType = {
    listIdOrListName: string;
    enable?: boolean;
    onChange?: () => void;
    onConnect?: () => void;
    onDisconnect?: (reason: string) => void;
  };
  