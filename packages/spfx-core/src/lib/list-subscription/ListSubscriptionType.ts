export type ListSubscriptionType = {
    listIdOrListName: string;
    onChange?: () => void;
    onConnect?: () => void;
    onDisconnect?: (reason: string) => void;
  };
  