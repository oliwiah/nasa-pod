import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Wrapper = styled.div`
  height: 100%1;
`;

ReactDOM.render(
  <Wrapper>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Wrapper>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
