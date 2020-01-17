import React from 'react';
import './styles.css';
import {
  Grommet, Box, Button, Heading, Footer, Main,
} from 'grommet';
import theme from './grommet-theme.json';
import EntryForm from './EntryForm';
import Chef from './icons/Chef';
import Display from './Display';
import Background from './Background';

export default function App() {
  return (
    <>
      <Background />
      <Grommet theme={theme} full>
        <Box align="center"  direction="column" fill>
          <Display />
        </Box>
      </Grommet>
    </>
  );
}
