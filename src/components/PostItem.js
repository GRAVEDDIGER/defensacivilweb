import React, { useEffect, useState } from "react";
import {
  Card,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import styled from "styled-components";
import uuid from "react-uuid";
import ImageComponent from "./ImageComponent";
const ImageContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;
function sortArray(doc) {
  const keys = Object.keys(doc);
  const sortedArray = [];
  let firstValue = 0;
  let lastValue = keys.length;
  let keyIndex = {};
  keys.splice(keys.indexOf("id"), 1)
  let indexDb = keys.indexOf("title")
  if (indexDb !== -1) {
    sortedArray[firstValue] = "title";
    console.log("Se elimino title ", keys.splice(indexDb, 1));
    firstValue++;
  }
  indexDb = keys.indexOf("images")
  if (indexDb !== -1) {
    sortedArray[lastValue - 2] = "images";
    console.log("Se Elimino images ", keys.splice(indexDb, 1));

  }
  indexDb = keys.indexOf("render")
  if (indexDb !== -1) {
    sortedArray[lastValue - 3] = "render";
    keys.splice(indexDb, 1)
  }
  indexDb = keys.indexOf("name")
  if (indexDb !== -1) {
    sortedArray[firstValue] = "name";
    console.log("Se Elimino name ", keys.splice(indexDb, 1));
    firstValue++;
  }
  indexDb = keys.indexOf("position")
  if (indexDb !== -1) {
    sortedArray[firstValue] = "position";
    console.log("Se elimino position ", keys.splice(indexDb, 1));
    firstValue++;
  }
  indexDb = keys.indexOf("description")
  if (indexDb !== -1) {
    sortedArray[firstValue] = "description";
    keys.splice(indexDb, 1);
    firstValue++;
  }
  keys.sort().forEach((key) => {
    sortedArray[firstValue] = key;
    firstValue++;
  });
  console.log(sortedArray);
  return sortedArray
}
function PostItem({ doc, setPosts, index, posts }) {
  const [enabled, setEnabled] = useState(false);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    setFields(sortArray(doc))
    console.log("keys: ", fields)
  }, [doc])
  //debo armar funcion que me permita generar un array con el orden de los campos que yo quiero pra que se renderize de esa manera
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        margin: "1rem",
      }}
      raised
      key={doc.id}
    >
      <Stack
        direction="column"
        sx={{ justifyContent: "flex-end", width: "100%" }}
        
      >
        <ToggleButton
          sx={{ justifyContent: "flex-end" }}
          selected={enabled}
          onChange={() => setEnabled(!enabled)}
        >
          <CheckIcon />
        </ToggleButton>
      </Stack>
      <Stack id={doc.id} direction="column">
        {fields.map((field) => {
          if (field === "render") {
            return (
              <FormControlLabel
                control={<Switch disabled={!enabled} checked={doc.render} />}
                label="Render"
                key={uuid()}
              />
            );
          }
          if (field === "images") {
            return <ImageComponent origen={doc.images} titulo={doc.title} />;
          } else {
            return (
              <TextField
                disabled={!enabled}
                name={field}
                value={doc[field]}
                key={uuid()}
                multiline={(field==="description") ?true:false}
              />
            );
          }
        })}
      </Stack>
    </Card>
  );
}

export default PostItem;
