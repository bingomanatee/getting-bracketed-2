import styled from 'styled-components';
import _ from 'lodash';

export const ClipText = styled.div`
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 3px;
  width: 230px;
  word-break: break-all;
  overflow-y: auto;
  overflow-x: hidden;
  background: transparent;
  flex: 1;
`;

export const Entry = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${({ item }) => (_.get(item, 'checked', '') ? 'lime' : 'transparent')};
  user-select: none;
  padding-left: 0.5rem;
`;

export const Label = styled.div`
  color: darkBlue;
  font-size: 1.5rem !important;
  line-height: 150%;
  font-family: "Patrick Hand", "Comic Sans", "Helvetica", "sans-serif";
  margin-left: 0.5rem;
`;

export const ClipboardBack = styled.div`
  background-color: rgb(20, 20, 20);
  border-radius: 1rem 0 0 0.5rem;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`;
export const ClipboardPaper = styled.div`
  margin: 1rem;
  margin-right: 0;
  margin-bottom: 2.5rem;
  background-color: rgb(200, 175, 150);
  flex: 1;
`;

export const RangeLabel = styled.div`
  flex: 0;
  font-weight: bold;
  padding: 0 1rem;
  user-select: none;
`;
