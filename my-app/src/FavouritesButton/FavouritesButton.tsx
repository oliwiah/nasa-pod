import React from 'react';
import styled from 'styled-components';

const FavButton = styled.button`
    color: #646262;
    height: 3em;
    min-width: 160px;
    width: 25%;
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

export const FavouritesButton = () => {
    const addToFavourites = (e: any) => {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <FavButton onClick={addToFavourites}>Add to favourites</FavButton>
    );
}
