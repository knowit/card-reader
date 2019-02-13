import React from 'react';
import styled from '@emotion/styled';

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin:'auto';
  background-color: white;
`;


class AddEvent extends React.Component {

  render() {
    return (
      <ModalWrapper>
        Hei
      </ModalWrapper>
    )
  }
}

export default AddEvent;