/* eslint-disable */
import { IEmailProperties } from "@pnp/sp/sputilities";
import { getSP } from "../pnp";
import EmailSettings from "./EmailConfig"; 
import { isDebugMode } from "../debug";

export interface IEmailProps {
    from?: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
}

interface TypedHash<T> {
    [key: string]: T;
}

export class EmailBuilder implements IEmailProperties {
    To: string[];
    CC?: string[];
    BCC?: string[];
    Subject: string;
    Body: string;
    AdditionalHeaders?: TypedHash<string>;
    From?: string;

    private constructor() {
        this.To = [];
        this.CC = [];
        this.BCC = [];
        this.Subject = "";
        this.Body = "";
    }

    static createNewEmail = (): EmailBuilder => {
        return new EmailBuilder();
    };

    addFromEmail = (emailAddress: string): EmailBuilder => {
        this.From = emailAddress;
        return this;
    };

    addToEmails = (emailAddress: string[]): EmailBuilder => {
        this.To = [...this.To, ...emailAddress];
        return this;
    };

    addCCEmails = (emailAddress: string[]): EmailBuilder => {
        this.CC = [...(this.CC || []), ...emailAddress];
        return this;
    };

    addBCCEmails = (emailAddress: string[]): EmailBuilder => {
        this.BCC = [...(this.BCC || []), ...emailAddress];
        return this;
    };

    addSubject = (subject: string): EmailBuilder => {
        this.Subject = subject;
        return this;
    };

    addBody = (body: string): EmailBuilder => {
        this.Body = body;
        return this;
    };

    appendBody = (body: string): EmailBuilder => {
        this.Body = this.Body + body;
        return this;
    };

    addHeaders = (additionalHeaders: TypedHash<string>): EmailBuilder => {
        this.AdditionalHeaders = additionalHeaders;
        return this;
    };

    send = async () => {
        try {
            if (!this) throw "Email Configuration is not created.";
            if (!this.To) throw "Email Receiver is not added.";

            const { from, isEnabled, notificationDelegateEmails, notificationBCCEmails } = EmailSettings.getInstance();
            const isDebugging = isDebugMode();
            if (!isEnabled || isDebugging) {

                // override email receiver with delegate email
                this.appendBody(
                    `<br/> 
                    <h3>This email is intended for following users</h3> 
                    <hr/>`
                );
                this.appendBody("TO Emails : " + this.To?.join(", ") + "<br/>");
                this.appendBody("CC Emails: " + this.CC?.join(",") + "<br/>");
                this.appendBody("BCC Emails: " + this.BCC?.join(",") + "<br/>");

                this.To = notificationDelegateEmails || [];
                this.CC = [];
                this.BCC = [];
            }

            // set from email if is available in settings
            if (from?.length > 0) {
                this.From = from;
            }

            if(notificationBCCEmails?.length > 0) {
                this.BCC = notificationBCCEmails;
            }

            // get sp configuration
            const sp = await getSP();

            // remove duplicate emails from TO, CC, BCC
            this.To = [...new Set(this.To)];
            this.CC = [...new Set(this.CC)];
            this.BCC = [...new Set(this.BCC)];

            // send email
            await sp.utility
                .sendEmail(this as IEmailProperties)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}
