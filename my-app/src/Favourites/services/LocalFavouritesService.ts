export class LocalFavouritesService {
    static readonly LOCAL_STORAGE_KEY = 'localUserObserved';

    private static _instance: LocalFavouritesService;

    private _localStorage: Window['localStorage'] | null = null;

    private _podUrl: string[] = [];

    private _getDataFromLocalStorage(): void {
        if (!this._localStorage) {
            return;
        }

        const rawData =
            this._localStorage.getItem(LocalFavouritesService.LOCAL_STORAGE_KEY) || '{}';
        const { pods = [] } = JSON.parse(rawData) || {};

        this._podUrl = [...pods];
    }

    private _saveToLocalStorage(): void {
        if (!this._localStorage) {
            return;
        }

        this._localStorage.setItem(
            LocalFavouritesService.LOCAL_STORAGE_KEY,
            JSON.stringify({
                pods: this._podUrl,
            })
        );
    }

    constructor(localStorage: Window['localStorage']) {
        this._localStorage = localStorage || window.localStorage;
        this._getDataFromLocalStorage();
    }

    static getInstance(): LocalFavouritesService {
        if (!this._instance) {
            this._instance = new LocalFavouritesService();
        }

        return this._instance;
    }

    getAllPodUrls(): string[] {
        return this._podUrl;
    }

    addPodUrl(url: string): void {
        const hasPodUrl = this._podUrl.includes(url);

        if (!hasPodUrl) {
            this._podUrl = [url, ...this._podUrl];
            this._saveToLocalStorage();
        }
    }

    removePodUrl(url: string): void {
        const newPodUrls = this._podUrl.filter((podUrl) => podUrl !== url);

        if (newPodUrls.length !== this._podUrl.length) {
            this._podUrl = newPodUrls;
            this._saveToLocalStorage();
        }
    }
}
