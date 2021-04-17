import React from 'react';
import styled from 'styled-components';

import { Photo } from '../Photo/Photo';
import { LocalFavouritesService } from './services/LocalFavouritesService';

const Wrapper = styled.div`
    padding: 10px;
`;

export const FavouritePods = () => {
    const localFavouritesService = LocalFavouritesService.getInstance();
    const getFavourites = localFavouritesService.getAllPodUrls();

    return (
        <>
            {getFavourites.map((url: string) => (
                <Wrapper>
                    <Photo url={url} />
                </Wrapper>
            ))}
        </>
    );
};
