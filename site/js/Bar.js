import React, { Component } from 'react';
import styled from 'styled-components';
import { withSize } from 'react-sizeme';
import SVG from 'svg.js';
import { Box } from 'grommet';
import _ from 'lodash';

import barStream from './state/barStream';

const Frame = styled.section`
width: 100%;
height: 100%;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-repeat: repeat-x;
font-family: 'Fredoka One',  "Helvetica Neue", sans-serif;
font-size: 3rem;
overflow: hidden;
`;

export default withSize({ monitorHeight: true, monitorWidth: true })(class Bar extends Component {
  constructor(p) {
    super(p);
    this.frameRef = React.createRef();
    this.state = { init: false, tables: [] };
    this.stream = barStream(p);
  }

  init() {
    if (this.state.init) {
      return;
    }
    this.setState({ init: true }, () => {
      const { width, height } = this.props.size;
      const ele = this.frameRef.current;
      this.svg = SVG(ele).size(width, height);
      this.stream.do.setSvg(this.svg);
    });
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
  // this.stream.do.checkSize(this.props.size);
  }

  componentDidMount() {
    this.tryToInit();

    this.stream.subscribe(({ value }) => this.setState(value));
  }

  render() {
    return (
      <Frame ref={this.frameRef}>
      </Frame>
    );
  }
});
