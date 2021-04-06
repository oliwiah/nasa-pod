import React, { useContext } from 'react';

import { FavouritesContext } from './FavouritesContext';

export const MyFavourites = () => {
    const { refreshPods } = useContext(FavouritesContext)
    const getFavourites = async (): Promise<void> => {
        console.log(await refreshPods());
    }

    return (
        <button onClick={getFavourites}>My Favourites</button>
    );
}
