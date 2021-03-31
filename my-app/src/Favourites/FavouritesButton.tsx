import React, { useContext } from 'react';
import styled from 'styled-components';

import { PodResponseType } from '../App';
import { FavouritesContext } from './FavouritesContext';

const FavButton = styled.button`
    color: #646262;
    height: 4em;
    min-width: 160px;
    width: 35%;
    padding: 1.5em auto;
    margin: 1em auto;
    background-color: #FEB1C0;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    transition: all 0.2s cubic-bezier(.4,0,.2,1);
    cursor: pointer;

    &:hover {
        letter-spacing: 0.8em;
        background-color: #F08C99;
    }
`;

type Props = {
    pod: PodResponseType
}

export const FavouritesButton = ({ pod }: Props) => {
    const { addPod } = useContext(FavouritesContext);
    const addToFavourites = (e: any) => {
        e.preventDefault();
        addPod(pod);
    }

    return (
        <FavButton onClick={addToFavourites}>Add to favourites</FavButton>
    );
}
