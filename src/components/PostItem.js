import React, { useState } from "react";
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
function PostItem({ doc, setPosts, index, posts }) {
  const [enabled, setEnabled] = useState(false);
  const [fields, setFields] = useState([]);
  //debo armar funcion que me permita generar un array con el orden de los campos que yo quiero pra que se renderize de esa manera
  const keys = Object.keys(doc);
  const sortedArray = [];
  keys.forEach((key) => {});

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
      <Stack direction="column">
        {Object.keys(doc).map((field) => {
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
              />
            );
          }
        })}
      </Stack>
    </Card>
  );
}

export default PostItem;
