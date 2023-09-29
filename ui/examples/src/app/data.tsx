import { PresenceBadgeStatus } from "@fluentui/react-components";
import { faker } from '@faker-js/faker';
import { FolderRegular, EditRegular } from "@fluentui/react-icons";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

export type Item = {
  id: number | string;
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

export function createRandomUser(): Item {
  return {
    id: faker.string.uuid(),
    file: {
      label: faker.system.fileName(),
      icon: <FolderRegular />,
    },
    author: {
      label: faker.internet.displayName(),
      status:"available",
    },
    lastUpdated: {
      label: faker.date.recent().toLocaleDateString(),
      timestamp: faker.date.recent().getTime(),
    },
    lastUpdate: {
      label: faker.lorem.sentence(),
      icon: <EditRegular />,
    },
  } as Item;
}

export const items: Item[] = faker.helpers.multiple(createRandomUser, {
  count: 5000,
});
