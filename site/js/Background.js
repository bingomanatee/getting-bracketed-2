import React, { Component } from 'react';
import styled from 'styled-components';
import { withSize } from 'react-sizeme';
import SVG from 'svg.js';
import { Box } from 'grommet';
import _ from 'lodash';

import backgroundStream from './state/backgroundStream';

import Table from './icons/Table';
import SvgChair1 from './icons/Chair1';
import SvgChair2 from './icons/Chair2';

const SvgWrapper = styled.div`
position: absolute;
`;

const Frame = styled.section`
width: 100%;
height: 100%;
position: absolute;
background-color: rgb(20,23,31);
background-image: url('/img/bar_back.png');
background-repeat: repeat-x;
font-family: 'Fredoka One',  "Helvetica Neue", sans-serif;
font-size: 3rem;
overflow: hidden;
z-index: -1000;
`;

export default withSize({ monitorHeight: true, monitorWidth: true })(class Bar extends Component {
  constructor(p) {
    super(p);
    this.stream = backgroundStream(p);
    this.state = { init: false, ...this.stream.value };
  }

  tryToInit() {
    const { width, height } = this.props.size;
    if (width && height) {
      this.init();
    } else {
      setTimeout(() => this.tryToInit(), 100);
    }
  }

  componentDidUpdate() {
    //this.stream.do.checkSize(this.props.size);
  }

  componentDidMount() {
    this.stream.do.checkSize(this.props.size);
    this.stream.subscribe(({ value }) => this.setState(value));
  }

  render() {
    return (
      <Frame id="background">
        {this.state.tables.map(({
          x, y, id, z,
        }) => (
          <SvgWrapper key={id} style={({ left: x, top: y })}>
            <Box direction="row">
              <SvgChair1 left={_.random(-20, 20)} />
              <Table />
              <SvgChair2 left={_.random(-20, 20)} />
            </Box>
          </SvgWrapper>
        ))}
      </Frame>
    );
  }
});
