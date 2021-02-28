import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(-360deg);
    }
`;

const LoaderWrapper = styled.div`
    z-index: 100;
    background: #205fac;
    padding: 2em;
    font-family: 'exo 2';
    text-transform: uppercase;
    overflow: hidden;
    min-height: calc(100vh - 60px);
`;

const Logo = styled.div`
    position: fixed;
    width: 10em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Star1 = styled.div`
    position: absolute;
    top: 0;
    left: 9em;
    font-size: 0.2em;
    width: 0.5em;
    height: 0.5em;
    background: white;
    border-radius: 50%;
    box-shadow: white 2em 0em 0 -0.1em, white 1em 1em 0 -0.1em, white 1.4em -1em 0 -0.2em,
        white -1em -0.3em 0 -0.1em, white -0.1em 1.2em 0 -0.2em, white -2em 1.5em 0 -0.2em,
        white 0.5em 1.8em 0 -0.1em, white 1em 2em 0 -0.2em, white 2em 2.5em 0 -0.2em,
        white 2.3em 2.1em 0 -0.2em;
`;

const Star2 = styled.div`
    position: absolute;
    top: 0;
    left: 9em;
    font-size: 0.2em;
    width: 0.5em;
    height: 0.5em;
    background: white;
    border-radius: 50%;
    box-shadow: white 2em 0em 0 -0.1em, white 1em 1em 0 -0.1em, white 1.4em -1em 0 -0.2em,
        white -1em -0.3em 0 -0.1em, white -0.1em 1.2em 0 -0.2em, white -2em 1.5em 0 -0.2em,
        white 0.5em 1.8em 0 -0.1em, white 1em 2em 0 -0.2em, white 2em 2.5em 0 -0.2em,
        white 2.3em 2.1em 0 -0.2em;
    top: 11em;
    left: 12em;
    transform: rotate(-40deg);
`;

const Star3 = styled.div`
    position: absolute;
    top: 0;
    left: 9em;
    font-size: 0.2em;
    width: 0.5em;
    height: 0.5em;
    background: white;
    border-radius: 50%;
    box-shadow: white 2em 0em 0 -0.1em, white 1em 1em 0 -0.1em, white 1.4em -1em 0 -0.2em,
        white -1em -0.3em 0 -0.1em, white -0.1em 1.2em 0 -0.2em, white -2em 1.5em 0 -0.2em,
        white 0.5em 1.8em 0 -0.1em, white 1em 2em 0 -0.2em, white 2em 2.5em 0 -0.2em,
        white 2.3em 2.1em 0 -0.2em;
    top: 9em;
    left: 0em;
    transform: rotate(45deg);
`;

const Swoosh1 = styled.span`
    display: block;
    position: absolute;
    top: 3.5em;
    width: 5em;
    height: 3em;
    border-top: 0.5em solid #ee2c3e;
    border-top-left-radius: 10em 2em;
    z-index: 3;
    transform: rotate(-10deg);
`;

const Swoosh2 = styled.span`
    display: block;
    position: absolute;
    top: -0.3em;
    left: 4em;
    width: 6em;
    height: 3em;
    border-bottom: 0.5em solid #ee2c3e;
    border-bottom-right-radius: 10em 4em;
    z-index: 1;
    transform: rotate(-10deg);
`;

const Swoosh3 = styled.span`
    display: block;
    position: absolute;
    top: 0.8em;
    left: 5em;
    width: 5em;
    height: 2em;
    transform: rotate(-30deg);
    border-bottom: 0.2em solid #ee2c3e;
    border-bottom-right-radius: 10em 2em;
    z-index: 5;
`;

const Swoosh4 = styled.span`
    display: block;
    position: absolute;
    top: 4.7em;
    left: 2em;
    width: 6em;
    height: 4em;
    border-top: 0.2em solid #ee2c3e;
    border-top-left-radius: 10em 3em;
    z-index: 5;
    transform: rotate(-30deg);
`;

const Text = styled.h1`
    position: absolute;
    z-index: 4;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    width: 20em;
    text-align: center;
    display: block;
    color: #fff;
    line-height: 0.8;
    font-size: 47px;
`;

const OrbitOuter = styled.div`
    position: relative;
    width: 8em;
    height: 8em;
    margin-left: 0em;
    perspective: 10em;
    transform: rotate(45deg);
    z-index: 2;
`;

const OrbitWrapper = styled.div`
    font-size: 2em;
    margin: 0 auto;
    transform: rotateX(-60deg) translateZ(0);
    transform-style: preserve-3d;
    width: 4em;
    height: 4em;
`;

const Orbit = styled.div`
    width: 4em;
    height: 4em;
    border-radius: 50%;
    border: 0.1rem solid white;
    border-left-width: 0;
    position: relative;
    animation: ${spin} 2s infinite linear;

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: -0.05rem;
        border-radius: 2em 0 0 0;
        border-left: 0.4rem solid white;
        width: 2em;
        height: 2em;
        transform: rotate(15deg);
        transform-origin: 100% 100%;
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 2.3em;
        left: 0;
        background: white;
        transform: rotate(15deg);
        width: 0.5rem;
        height: 0.8rem;
        border-radius: 50%;
    }
`;

export const Loader = () => (
    <LoaderWrapper>
        <link href="https://fonts.googleapis.com/css?family=Exo+2:700" rel="stylesheet"></link>
        <Logo>
            <Star1 />
            <Star2 />
            <Star3 />
            <div>
                <Swoosh1 />
                <Swoosh2 />
                <Swoosh3 />
                <Swoosh4 />
            </div>
            <Text>Nasa</Text>
            <OrbitOuter>
                <OrbitWrapper>
                    <Orbit />
                </OrbitWrapper>
            </OrbitOuter>
        </Logo>
    </LoaderWrapper>
);
