// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Table } from '@prt-ts/fluent-react-table';
import styles from './app.module.scss';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";

import Web from './Web';

import { Route, Routes, Link } from 'react-router-dom';
import { PresenceBadgeStatus } from '@fluentui/react-components';

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

type Item = {
  id : number | string
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};
const items: Item[] = [
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
  {
      id : 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
          label: "You edited this",
          icon: <EditRegular />,
      },
  },
  {
      id : 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
          label: "You recently opened this",
          icon: <OpenRegular />,
      },
  },
  {
      id : 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
          label: "You shared this in a Teams chat",
          icon: <PeopleRegular />,
      },
  },
];

export function App() {
  return (
    <div>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<div><Web/></div>} />
        <Route
          path="/page-2"
          element={
            <div>
                  <Table items={items} size='small' selectionMode='multiple' columns={[
                      {
                          columnId: "file.label",
                          renderHeaderCell: () => <>File</>,

                          renderCell: (item: Item) => <>{item.file.icon} {item.file.label}</>,

                          sizeOptions: {
                              defaultWidth: 500
                          }
                      },
                      {
                          columnId: "author.label",
                          renderHeaderCell: () => <>Author</>
                      },
                      {
                          columnId: "lastUpdated.label",
                          renderHeaderCell: () => <>Last Updated</>
                      },
                      {
                        columnId: "lastUpdate.label",
                        renderHeaderCell: () => <>Note</>,
                        renderMedia : (item: Item) => item.lastUpdate.icon
                    }
                  ]} />
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
