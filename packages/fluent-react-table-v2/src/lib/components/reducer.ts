
export const TableActions = {
    TOGGLE_FILTER_DRAWER: 'TOGGLE_FILTER_DRAWER',
    TOGGLE_VIEW_DRAWER: 'TOGGLE_VIEW_DRAWER',

    OPEN_FILTER_DRAWER: 'OPEN_FILTER_DRAWER',
    OPEN_VIEW_DRAWER: 'OPEN_VIEW_DRAWER',

    CLOSE_FILTER_DRAWER: 'CLOSE_FILTER_DRAWER',
    CLOSE_VIEW_DRAWER: 'CLOSE_VIEW_DRAWER',
}

export type DrawerTableState = {
    isFilterDrawerOpen: boolean;
    isViewsDrawerOpen: boolean;
}

export type ActionType<TPayloadData> = {
    type: keyof typeof TableActions;
    payload?: TPayloadData;
}

// write a reducer function to handle the state of the table
export function tableReducer<TPayloadData>(state: DrawerTableState, action: ActionType<TPayloadData>) : DrawerTableState {
    switch (action.type) {
        case TableActions.TOGGLE_FILTER_DRAWER:
            return {
                ...state,
                isFilterDrawerOpen: !state.isFilterDrawerOpen
            }
        case TableActions.TOGGLE_VIEW_DRAWER:
            return {
                ...state,
                isViewsDrawerOpen: !state.isViewsDrawerOpen
            }
        case TableActions.OPEN_FILTER_DRAWER:
            return {
                ...state,
                isFilterDrawerOpen: true
            }
        case TableActions.OPEN_VIEW_DRAWER:
            return {
                ...state,
                isViewsDrawerOpen: true
            }
        case TableActions.CLOSE_FILTER_DRAWER:
            return {
                ...state,
                isFilterDrawerOpen: false
            }
        case TableActions.CLOSE_VIEW_DRAWER:
            return {
                ...state,
                isViewsDrawerOpen: false
            }

        default:
            return state;
    }
}