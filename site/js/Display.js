import React, { Component } from 'react';
import {
  Box,
  Button,
  RangeInput,
  Heading,
  Grid,
  Stack, Footer,
} from 'grommet';
import _ from 'lodash';

import {
  ClipboardBack, ClipboardPaper, ClipText, Entry, Label, RangeLabel,
} from './displayStyles';
import Clipboard from './Clipboard';
import Chef from './icons/Chef';
import waitList from './state/waitList.store';
import Clear from './icons/Clear';
import Process from './icons/Process';
import Ok from './icons/Ok';
import Fail from './icons/Fail';

import Processor from './Processor';
import Bar from './Bar';
import EntryForm from './EntryForm';

export default class Display extends Component {
  constructor(p) {
    super(p);
    this.state = { ...waitList.value };
    this.changeSpeed = this.changeSpeed.bind(this);
  }

  componentDidMount() {
    this._sub = waitList.subscribe(
      (s) => this.setState(s.value),
      (err) => console.log('error  of waitList: ', err),
    );
  }

  changeSpeed(e) {
    waitList.do.setSpeed(Number.parseInt(e.target.value, 10));
  }

  componentWillUnmount() {
    this._sub.unsubscribe();
  }

  render() {
    return (
      <Grid
        fill
        columns={['auto', '250px']}
        rows={['200px', 'auto', '200px', '80px']}
        align="stretch"
        areas={[
          { name: 'head', start: [0, 0], end: [1, 0] },
          { name: 'list', start: [1, 1], end: [1, 1] },
          { name: 'chef', start: [1, 2], end: [1, 2] },
          { name: 'processor', start: [0, 1], end: [0, 2] },
          { name: 'entry', start: [0, 3], end: [1, 3] },
        ]}
      >
        <Box gridArea="head" direction="column" fill="horizontal" pad={0}>
          <Heading margin={0} textAlign="center" color="light-2">Getting Bracketed</Heading>
          <Box
            background="neutral-2"
            direction="row"
            pad="small"
            gap="medium"
            fill="horizontal"
            justify="stretch"
          >
            <RangeLabel>Speed</RangeLabel>
            <div style={{ flex: 1 }}>
              <RangeInput
                type="range"
                min={0}
                max={2000}
                step={10}
                value={this.state.speed}
                onChange={this.changeSpeed}
              />
            </div>
            <RangeLabel>{this.state.speed}</RangeLabel>
          </Box>
        </Box>
        <Box
          gridArea="processor"
          fill
          justify="stretch"
          alighContent="stretch"
          overflow="hidden"
        >
          <Stack fill>
            <Processor />
            <Bar />
          </Stack>
        </Box>
        <Stack fill gridArea="list" interactiveChild={1}>
          <ClipboardBack>
            <ClipboardPaper />
          </ClipboardBack>
          <Box fill margin={0}>
            <ClipText>
              {this.state.items.map((item, i) => (
                <Entry
                  item={item}
                  key={item.id}
                  onClick={() => waitList.do.toggleChecked(item)}
                >
                  <Box direction="row" align="start" fill="horizontal">
                    {item.processed ? item.balanced ? <Ok /> : <Fail /> : ''}
                    <Label style={{ flex: 1 }}>{item.label}</Label>
                  </Box>
                </Entry>
              ))}
            </ClipText>
            <Box direction="row" gap="medium" margin="4px" justify="between">
              <Button
                color="lightGreen"
                pad={2}
                icon={<Clear />}
                plain
                label="Clear"
                onClick={waitList.do.clearChecked}
                disabled={!waitList.do.hasChecked() || !!waitList.my.processing}
              />
              <Button
                color="accent-3"
                pad={2}
                icon={<Process />}
                plain
                label="Run"
                onClick={() => waitList.do.process(true)}
                disabled={!waitList.do.hasItems() || !!waitList.my.processing}
              />
            </Box>
          </Box>
          <Clipboard />
        </Stack>
        <Box gridArea="chef">
          <Chef style={{ fontSize: '200px' }} />
        </Box>

        <Box gridArea="entry">
          <EntryForm />
        </Box>
      </Grid>
    );
  }
}
