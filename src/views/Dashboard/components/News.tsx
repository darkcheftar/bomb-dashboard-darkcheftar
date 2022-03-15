import React from 'react';
import styled from 'styled-components';


const Styleddiv = styled.div`
margin:10px;
height:90%;
background: rgba(32, 37, 67, 0.5);
color: white;
`

const News: React.FC<any> = () => {

  return (
   <Styleddiv>Latest News</Styleddiv>
  );
};
export default News;
