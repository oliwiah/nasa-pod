import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
    position: relative;
    margin: auto;
    overflow: hidden;
    width: 60vw;
`;

const Image = styled.img`
    max-width: 100%;
    transition: all 0.3s;
    display: block;
    width: 100%;
    height: auto;
    transform: scale(1);

    &:hover {
        transform: scale(1.1);
    }
`;

type Props = {
    url: string;
};

export const Photo = ({ url }: Props) => (
    <ImageWrapper>
        {url?.includes('image') ? (
            <Image src={url} alt="POD image" />
        ) : (
            // use <video> html tag https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
            <iframe width="100%" height="auto" title="POD youtube video" src={url}></iframe>
        )}
    </ImageWrapper>
);
