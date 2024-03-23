import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { PinOffRegular, StarRegular, SwipeDownFilled, SwipeUpFilled } from "@fluentui/react-icons";
import { Show } from "@prt-ts/react-control-flow";
import { Row, RowData } from "@tanstack/react-table";

type PinRowActionProps<TData extends RowData> = {
    row: Row<TData>;
}

export const PinRowAction = <TData extends RowData>({ row }: PinRowActionProps<TData>) => {
    const isPinned = row.getIsPinned();
    return (
        <>
            <Show when={isPinned}>

                <Button
                    size="small"
                    shape="circular"
                    onClick={() => row.pin(false, true, false)}
                    icon={<PinOffRegular />}
                />
            </Show>
            <Show when={!isPinned}>
                <div>
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <Button
                                icon={<StarRegular />}
                                shape="circular"
                                size="small"
                            />
                        </MenuTrigger>

                        <MenuPopover>
                            <MenuList>
                                <MenuItem
                                    icon={<SwipeUpFilled />}
                                    onClick={() =>
                                        row.pin('top', true, false)
                                    }>
                                    Top
                                </MenuItem>
                                <MenuItem
                                    icon={<SwipeDownFilled />}
                                    onClick={() =>
                                        row.pin('bottom', true, true)
                                    }>
                                    Bottom
                                </MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            </Show>
        </>
    );
}