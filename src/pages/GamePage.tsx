import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import InputForm from "../components/InputForm";
import Typography from "@mui/material/Typography";


const GamePage: FC = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#D2E9E9", mx: "auto" }}>
        <Container>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            sx={{ pt: "2rem", pb: "3rem"}}
          >
            Zombies Apocalypse
          </Typography>
        </Container>
        <Box display="flex">
          <InputForm />
        </Box>
      </Box>
    </>
  );
};

export default GamePage;