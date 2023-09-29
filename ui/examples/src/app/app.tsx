// eslint-disable-next-line @typescript-eslint/no-unused-vars

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
import { TableExample } from "./TableExample";


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
                <Route path="/" element={<div><Web /></div>} />
                <Route
                    path="/page-2"
                    element={<TableExample />}
                />
            </Routes>
            {/* END: routes */}
        </div>
    );
}

export default App;
