import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Photo } from './Photo/Photo';
import { Date } from './Date/Date';
import fetchApi from './requests/fetchApi';

const AppWrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  padding: 20px 10px 0;
  background-color: #e5e5e5;
`;

const Smaller = styled.span`
  font-size: 12px;
`;

const BorderWrapper = styled.div`
  border-width: 1px 0;
  border-style: solid;
  border-image: linear-gradient(90deg, #fff, #999, #fff);
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

const LeftArrow = styled.div`
  cursor: pointer;
  display: block;
  margin: 30px auto;
  width: 35px;
  height: 35px;
  border-top: 3px solid #333333;
  border-left: 3px solid #333333;
  transform: rotate(-45deg);
`;

const RightArrow = styled.div`
  cursor: pointer;
  display: block;
  margin: 30px auto;
  width: 35px;
  height: 35px;
  border-top: 3px solid #333333;
  border-left: 3px solid #333333;
  transform: rotate(135deg);
`;

const Break = styled.hr`
  border-image: linear-gradient(90deg, #fff, #999, #fff);
  border-image-slice: 1;
  border-width: 1px 0 0;
  width: 50%;
  margin: 20px auto;
`;

const Explanation = styled.p`
  width: 70%;
  margin: auto;
  text-align: justify;
`;

interface ResponseType {
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
  const [pod, setPod] = useState<ResponseType>();

  useEffect(() => {
    fetchApi.getTodaysPod().then(podData => {
      setPod(podData.data)
    })
  }, []);

  return (
    <AppWrapper>
      <h1>Astronomy Picture of the Day <Smaller>powered by NASA</Smaller></h1>
      {pod && (
        <div>
          <BorderWrapper>
            <h3>{pod.title}</h3>
            <Date date={pod.date} />
          </BorderWrapper>
          <GalleryWrapper>
            <LeftArrow />
            <Photo url={pod.hdurl}/>
            <RightArrow />
          </GalleryWrapper>
          <Break />
          <Explanation>{pod.explanation}</Explanation>
        </div>
      )}
    </AppWrapper>
  )
}

export default App;
