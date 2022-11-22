import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { handleSaveBuilder } from "../functions/firebase";
import styled from "styled-components";
import styledMui from "@emotion/styled";
import {
  FormControl,
  Grid,
  TextField,
  TextareaAutosize,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import uuid from "react-uuid";
const initialForm = { title: "", description: "" };
const FormControlStyled = styledMui(FormControl)`
  outline: 1px solid #d5d5d5;
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin:0;
  padding: 3rem 6rem;
  box-shadow: 2px 2px 15px #333;
  width: 100%;
  input{width:100%}
  @media (max-width: 800px) {
    padding: 3rem;
  }
  @media (max-width: 600px) {
    padding: 2rem;
  }
  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
const ImageContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
`;
function BuilderNewPost({ value, tabs }) {
  const [formData, handleChange, setFormData] = useForm(initialForm);
  const [imagenes, setImagenes] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleSave = async () => {
    console.log("TEXTO", formData);
    handleSaveBuilder(imagenes, tabs, value, formData, uuid());
    setFormData(initialForm);
    setImagenes([]);
  };

  const handleClick = (e) => {
    const pickerOptions = {
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: true,
    };
    let temporal = [];
    window.showOpenFilePicker(pickerOptions).then((res) => {
      res.map((file) =>
        file.getFile().then((imagen) => {
          temporal.push(imagen);
          setImagenes(temporal);
        })
      );
    });
  };
  return (
    <FormControlStyled sx={{}}>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid xs={12}>
          <TextField
            label="Titulo"
            name="title"
            helperText="Titulo de la tarjeta"
            value={formData.title}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid xs={12}>
          <TextareaAutosize
            minRows={7}
            label="Descripcion"
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="small"
            style={{ resize: "none", width: "100%" }}
          />
        </Grid>
        <Grid sx={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleClick}
            size="small"
            sx={{
              width: "100%",
              marginTop: "1rem",
              marginBottom: "1rem",
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Subir Imagen{" "}
          </Button>
        </Grid>

        <ImageList
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            justifyItems: "center",
          }}
          cols={isMobile ? 1 : 3}
          rowHeight={164}
          elevation={4}
        >
          {imagenes.map((item) => (
            <ImageListItem
              elevation={3}
              sx={{
                width: "auto",
                maxWidth: "200px",
                margin: "1rem",
                padding: "0.3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                boxShadow: "3px,3px 15px #333",
              }}
              key={uuid()}
            >
              <ImageContainer
                src={URL.createObjectURL(item)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      -
      <Button
        sx={{ maxWidth: "300px", alignSelf: "center" }}
        variant="contained"
        onClick={handleSave}
      >
        Guardar
      </Button>
    </FormControlStyled>
  );
}

export default BuilderNewPost;
