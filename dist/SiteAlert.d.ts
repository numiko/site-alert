type Options = {
    closeElement: HTMLElement | string;
    cookieId?: string;
    cookiePrefix?: string;
    cookieExpiry?: number;
};
declare class SiteAlert {
    alert: HTMLElement;
    closeElement: HTMLElement;
    cookieId?: string;
    cookiePrefix: string;
    cookieExpiryInDays: number;
    constructor(alert: HTMLElement | string, options: Options);
    getCookieName(): string;
    cookieExists(): string | undefined;
    setCookie(): void;
    showAlert(): void;
    removeAlert(): void;
    addEventListeners(): void;
    init(): void;
}
export { SiteAlert, type Options };
