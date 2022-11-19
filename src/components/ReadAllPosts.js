import {
  Typography,
  Paper,
  Card,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db, pagesCollection } from "../functions/firebase";
import { onSnapshot, collection, query } from "firebase/firestore";
import styled from "styled-components";

const ImageContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;
const initialRender = { id: "", value: true };

function ReadAllPosts({ activeTab }) {
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState({});
  const onChangeSwitch = (id, value) => {
    const objeto = { [id]: value };
    setRender({ ...render, objeto });
  };
  useEffect(() => {
    const q = query(collection(db, activeTab));
    const array = [];
    onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        const objeto = { ...doc.data(), id: doc.id };
        array.push(objeto);
      });
      setPosts(array);
    });
  }, []);
  console.log("tipò", typeof posts, "Contenido", posts);

  return (
    <Paper>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold" }}
      >
        POST GUARDADOS{" "}
      </Typography>
      {posts.length > 0
        ? posts.map((doc) => {
            return (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "1rem",
                  backgroundColor: "#d9d9d9",
                  margin: "1rem",
                }}
                raised
              >
                <Stack direction="row" spacing={4}>
                  {doc.images.map((image) => {
                    return (
                      <ImageContainer
                        src={image}
                        alt={doc.title}
                        style={{ width: "200px" }}
                      />
                    );
                  })}
                </Stack>
                <Stack direction="column" sx={{ margin: "0.5rem" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ fontWeigth: "bold" }}
                  >
                    {doc.title}
                  </Typography>
                  <Typography>{doc.description}</Typography>
                  <Stack direction="column" sx={{ alignContent: "center" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked
                          id={doc.id}
                          value={render.value}
                        />
                      }
                      label="Renderizar"
                      sx={{ justifyContent: "center" }}
                    />
                  </Stack>
                </Stack>
              </Card>
            );
          })
        : null}
      <Stack direction="row" sx={{ justifyContent: "center" }}>
        <Button variant="contained" sx={{ margin: "1rem" }}>
          Update
        </Button>
      </Stack>
    </Paper>
  );
}

export default ReadAllPosts;
