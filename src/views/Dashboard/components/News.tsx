import React from 'react';
import styled from 'styled-components';


const Styleddiv = styled.div`
margin: 10px;
height: 90%;
 background: #23284bbf;
  border:  1px solid #728cdf;
  border-radius: 10px;
  padding: 10px;
`

const News: React.FC<any> = () => {

  return (
   <Styleddiv>Latest News</Styleddiv>
  );
};
export default News;
