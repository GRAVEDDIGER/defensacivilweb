import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { pagesCollection } from "../functions/firebase";
import { getDocs } from "firebase/firestore";
import BuilderTabs from "../components/BuilderTab";
const HomeContainer = styled.main`
  margin-top: 131px;
  margin-bottom: 101px;
  height: 100%;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: justify;
  h2 {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const initialTabs = [
  {
    label: "Create Tab",
    id: "1",
  },
];

export const Builder = () => {
  const [tabs, setTabs] = useState(initialTabs);
  useEffect(() => {
    getDocs(pagesCollection).then((pages) => {
      let array = [];
      pages.forEach((page) => {
        array.push(page.data());
      });
      setTabs(array);
    });
  }, []);

  return (
    <HomeContainer component="main">
      <BuilderTabs tabs={tabs} setTabs={setTabs} />
    </HomeContainer>
  );
};
