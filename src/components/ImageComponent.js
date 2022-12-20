import React, { useState } from "react";
import styled from "styled-components";
const ImageContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  border: 2px dashed red;
  margin-top: 0.5rem;
  margin-bottom: 0%.5rem;
`;

function ImageComponent(origen, titulo) {
  console.log(origen.titulo, "origen");
  return (
    <>
      {origen.origen.map((image) => {
        return <ImageContainer src={image} alt={origen.titulo} />;
      })}
    </>
  );
}

export default ImageComponent;
