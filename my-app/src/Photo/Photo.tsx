import React from 'react';

type Props = {
    url: string
}

export const Photo = ({ url }: Props) => {

    return (
        <img src={url} alt='POD' width="50%" height="auto" />
    );
};
