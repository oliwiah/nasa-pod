import React from 'react';

import { Photo } from '../Photo/Photo';
import { LocalFavouritesService } from './services/LocalFavouritesService';

export const FavouritePods = () => {
    const localFavouritesService = LocalFavouritesService.getInstance();
    const getFavourites = localFavouritesService.getAllPodUrls();

    return (
        <div>
            {getFavourites.map((url) => (
                <Photo url={url} />
            ))}
        </div>
    );
};
