export interface FavouritesInterface {
    totalPods: number;
    addPod: () => void;
    removeAd: () => void;
    refreshPods: VoidFunction;
    isLoading: boolean;
}
