import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import PersonIcon from "@mui/icons-material/Person";
import { IBoardData } from "../interfaces";

const GameBoard: FC<IBoardData> = (props) => {
  const { gridSize, zombies, creatures, error } = props;
  return (
    <>
      <Container>
        <Container
          disableGutters
          sx={{
            flexGrow: 1,
            width: `${gridSize * 50}px`,
            height: `${gridSize * 50}px`,
            px: 0,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              "--Grid-borderWidth": "1px",
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "black",
              "& > div": {
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "black",
              },
            }}
          >
            {[...Array(gridSize * gridSize)].map((_, index) => (
              <Grid
                key={index}
                {...{ xs: 12 / gridSize }}
                minHeight={50}
                minWidth={50}
                sx={{ p: 0, position: "relative" }}
              >
                {zombies
                  .map((item) => gridSize * item.y + item.x)
                  .includes(index) && (
                  <DangerousIcon
                    sx={{
                      color: "#CD1818",
                      fontSize: "3rem",
                      position: "absolute",
                    }}
                  />
                )}
                {creatures
                  .map((item) => gridSize * item.y + item.x)
                  .includes(index) && (
                  <PersonIcon
                    sx={{
                      color: "#47A992",
                      fontSize: "3rem",
                      position: "absolute",
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container>
          {error && (
            <Typography
              variant="h5"
              component="h5"
              align="center"
              sx={{ pt: "2rem", pb: "3rem", color: "#CD1818" }}
            >
              {error}
            </Typography>
          )}
        </Container>
      </Container>
    </>
  );
};

export default GameBoard;
