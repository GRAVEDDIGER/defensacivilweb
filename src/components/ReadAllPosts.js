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
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import styled from "styled-components";
import PostItem from "./PostItem";

const initialRender = { id: "", value: true };

function ReadAllPosts({ activeTab }) {
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState({});
  useEffect(() => {
    const q = query(collection(db, activeTab));
    onSnapshot(q, (docs) => {
      const array = [];
      docs.forEach((doc) => {
        const objeto = { ...doc.data(), id: doc.id };
        array.push(objeto);
      });
      setPosts(array);
    });
  }, []);

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
        ? posts.map((doc, index) => {
            console.log(doc);
            return (
              <PostItem
                posts={posts}
                setPosts={setPosts}
                doc={doc}
                index={index}
              />
            );
          })
        : null}{" "}
    </Paper>
  );
}

export default ReadAllPosts;
