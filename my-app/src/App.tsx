import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Photo } from './Photo/Photo';
import { Date as DateComponent } from './Date/Date';
import { FavouritesButtons } from './Favourites/FavouritesButtons';
import { FavouritePods } from './Favourites/FavouritePods';
import { Loader } from './components/Loader';
import fetchApi from './requests/fetchApi';
import { incrementDate } from './constants/dateOperations';
import { FavouritesContextProvider } from './Favourites/FavouritesContext';

const AppWrapper = styled.div`
    min-height: 100vh;
    text-align: center;
    padding: 20px 10px 0;
    background-color: #778da9;
    background-image: linear-gradient(#778da9 0%, #415a77 74%);
`;

const HeadlineLink = styled(Link)`
    text-decoration: none;
`;

const Smaller = styled.span`
    font-size: 12px;
`;

const MyFavourites = styled.button`
    color: #646262;
    height: 2.5em;
    min-width: 100px;
    width: 25%;
    padding: 1.5em auto;
    margin: 1em auto;
    background-color: #feb1c0;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        letter-spacing: 0.8em;
        background-color: #f08c99;
    }
`;

const BorderWrapper = styled.div`
    border-width: 1px 0;
    border-style: solid;
    border-image: linear-gradient(90deg, #6d83a0, #1b263b, #6d83a0);
    border-image-slice: 1;
    margin: 20px 0;
    padding: 15px 0;
`;

const GalleryWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
`;

const LeftArrow = styled.button`
    all: unset;
    cursor: pointer;
    display: block;
    margin: 5vw auto;
    width: 3vw;
    height: 3vw;
    border-top: 3px solid #333333;
    border-left: 3px solid #333333;
    transform: rotate(-45deg);
`;

const RightArrow = styled.button`
    all: unset;
    cursor: pointer;
    display: block;
    margin: 5vw auto;
    width: 3vw;
    height: 3vw;
    border-top: 3px solid #333333;
    border-left: 3px solid #333333;
    transform: rotate(135deg);
`;

const Break = styled.hr`
    border-image: linear-gradient(90deg, #415a77, #1b263b, #415a77);
    border-image-slice: 1;
    border-width: 1px 0 0;
    width: 50%;
    margin: 20px auto;
`;

const Explanation = styled.p`
    width: 70%;
    margin: auto;
    text-align: justify;
    padding-bottom: 20px;
`;

export interface PodResponseType {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

const App = () => {
    const todaysDate = new Date().toISOString().slice(0, 10);
    const [pod, setPod] = useState<PodResponseType>();
    const [title, setTitle] = useState<string>('');
    const [picDate, setPicDate] = useState<string>(todaysDate);
    const [hdurl, setHdurl] = useState<string>('');
    const [explanation, setExplanation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        fetchApi
            .getTodaysPod(picDate)
            .then((podData) => podData.data)
            .then((data) => {
                setPod(data);
                setTitle(data.title);
                setPicDate(data.date);
                setHdurl(data.hdurl);
                setExplanation(data.explanation);
                data.media_type === 'image' ? setHdurl(data.hdurl) : setHdurl(data.url);
            })
            .then(() => setIsLoading(false));
    }, [picDate]);

    const getNextPic = (picDate: string) => {
        const nextDate = incrementDate(picDate, 1);
        nextDate > todaysDate ? setPicDate('1995-06-16') : setPicDate(nextDate);
    };

    const getPrevPic = (picDate: string) => {
        const prevDate = incrementDate(picDate, -1);
        prevDate < '1995-06-16' ? setPicDate(todaysDate) : setPicDate(prevDate);
    };

    return (
        <Router>
            <FavouritesContextProvider>
                <AppWrapper>
                    <HeadlineLink to="/">
                        <h1>
                            Astronomy Picture of the Day <Smaller>powered by NASA</Smaller>
                        </h1>
                    </HeadlineLink>
                    <Link to="/favourites">
                        <MyFavourites>My Favourites</MyFavourites>
                    </Link>

                    <Switch>
                        <Route path="/favourites">
                            <FavouritePods />
                        </Route>
                        <Route path="/">
                            {pod && !isLoading ? (
                                <div>
                                    <BorderWrapper>
                                        <h3>{title}</h3>
                                        <DateComponent date={picDate} />
                                    </BorderWrapper>
                                    <FavouritesButtons pod={pod} />
                                    <GalleryWrapper>
                                        <LeftArrow onClick={() => getPrevPic(picDate)} />
                                        <Photo url={hdurl} />
                                        <RightArrow onClick={() => getNextPic(picDate)} />
                                    </GalleryWrapper>
                                    <Break />
                                    <Explanation>{explanation}</Explanation>
                                </div>
                            ) : (
                                <Loader />
                            )}
                        </Route>
                    </Switch>
                </AppWrapper>
            </FavouritesContextProvider>
        </Router>
    );
};

export default App;
