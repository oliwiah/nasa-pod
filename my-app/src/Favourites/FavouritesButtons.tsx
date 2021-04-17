import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { PodResponseType } from '../App';
import { FavouritesContext } from './FavouritesContext';
import { LocalFavouritesService } from './services/LocalFavouritesService';

const FavButton = styled.button`
    color: #646262;
    height: 4em;
    min-width: 100px;
    width: 35%;
    padding: 1.5em auto;
    margin: 1em auto;
    background-color: #feb1c0;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        letter-spacing: 0.8em;
        background-color: #f08c99;
    }
`;

type Props = {
    pod: PodResponseType;
};

export const FavouritesButtons = ({ pod }: Props) => {
    const { addPod, removePod } = useContext(FavouritesContext);
    const localFavouritesService = LocalFavouritesService.getInstance();
    const getAllFavourites = localFavouritesService.getAllPodUrls();
    const isPodInFavourites: string[] = getAllFavourites.filter((podUrl) => podUrl === pod.url);
    const [isPodInFav, setIsPodInFav] = useState(!!isPodInFavourites.length);

    useEffect(() => {
        setIsPodInFav(!!isPodInFavourites.length);
    }, [isPodInFavourites]);

    const addToFavourites = (e: any) => {
        e.preventDefault();
        setIsPodInFav(!isPodInFav)
        addPod(pod);
    };

    const removeFromFavourites = (e: any) => {
        e.preventDefault();
        setIsPodInFav(!isPodInFav)
        removePod(pod);
    };

    return (
        <>
            {isPodInFav ? (
                <FavButton onClick={removeFromFavourites}>Remove from favourites</FavButton>
            ) : (
                <FavButton onClick={addToFavourites}>Add to favourites</FavButton>
            )}
        </>
    );
};
