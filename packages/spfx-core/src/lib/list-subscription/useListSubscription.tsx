/* eslint-disable */
import * as React from "react";
import { IListSubscription, ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { Guid } from "@microsoft/sp-core-library";
import { ListSubscriptionType } from "./ListSubscriptionType";
import { getSP } from "../pnp";

// create type using ListSubscriptionFactoryParams constructor
type BaseComponent = ConstructorParameters<typeof ListSubscriptionFactory>[0];

// declare _listSubscriptionFactory as global type
declare global {
    interface Window {
        _listSubscriptionFactory: ListSubscriptionFactory
    }
}

export function setSubscriptionFactory(component: BaseComponent) {
    window._listSubscriptionFactory = new ListSubscriptionFactory(component as any);
}

export const useListSubscription = (props: ListSubscriptionType) => {
    const { listIdOrListName, enable = true, onChange, onConnect, onDisconnect } = props;
    const _listSubscription = React.useRef<IListSubscription>();

    const _onChangeNotification = (): void => {
        // code to execute when the something changes on the list or library
        console.log("New Change Notification", listIdOrListName);
        onChange && onChange();
    };

    function _subscriptionConnected(): void {
        // code to execute when the subscription to the list has been established
        console.log("Connected", listIdOrListName);
        onConnect && onConnect();
    }

    function _subscriptionDisconnected(reason: string): void {
        // code to execute when the connection to the list has been disconnected
        console.log("Disconnected", listIdOrListName, reason);
        onDisconnect && onDisconnect(reason);
    }

    function _deleteSubscription(): void {
        if (_listSubscription.current) {
            window._listSubscriptionFactory.deleteSubscription(_listSubscription.current);
        }
    }

    async function createListSubscription(): Promise<void> {

        let listId = listIdOrListName;
        if (!Guid.isValid(listId)) {
            const sp = await getSP();
            const list = (await sp.web.lists.getByTitle(listIdOrListName).getParentInfos()).List.Id.toString();

            if (list) {
                console.log("list", list);
                listId = list;
            }
        }

        _listSubscription.current =
            await window._listSubscriptionFactory.createSubscription({
                listId: Guid.parse(listId),
                callbacks: {
                    notification: _onChangeNotification,
                    connect: _subscriptionConnected,
                    disconnect: _subscriptionDisconnected,
                },
            });
    }

    React.useEffect(() => {
        if (!enable) {
            console.log("Subscription is disabled", listIdOrListName);
            return;
        }
        try {
            console.log("creating subscription");

            createListSubscription()
                .catch((error) => {
                    console.log("error creating subscription", error);
                })
                .then(() => console.log("subscription created"));
        } catch (error) {
            console.log("error creating subscription", error);
        }

        return () => {
            _deleteSubscription();
            console.log("removing subscription");
        };
    }, [enable]);

    return {
        _listSubscription,
    } as const;
};