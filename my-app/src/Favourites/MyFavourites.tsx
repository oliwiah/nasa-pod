import React from 'react';

import { LocalFavouritesService } from './services/LocalFavouritesService';

export const MyFavourites = () => {
    const localFavouritesService = LocalFavouritesService.getInstance();
    const getFavourites = localFavouritesService.getAllPodUrls();

    return (
        <button
            onClick={() => {
                console.log(getFavourites);
            }}
        >
            My Favourites
        </button>
    );
};
