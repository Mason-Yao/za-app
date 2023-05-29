import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IPositionsRequest, IPosition } from "../interfaces";
import { getPositions } from "../services/api";
import { AxiosError } from "axios";

import GameBoard from "./GameBoard";

const InputForm: FC = () => {
  const [gridSize, setGirdSize] = useState(10);
  const [commands, setCommands] = useState("UDLR");
  const [zombie, setZombie] = useState<IPosition>({ x: 0, y: 0 });
  const [creatures, setCreatures] = useState<IPosition[]>([]);
  const [newCreature, setNewCreature] = useState<IPosition>({ x: 0, y: 0 });
  const [startStatus, setStartStatus] = useState(false);
  const [finalZombies, setFinalZombies] = useState<IPosition[]>([]);
  const [aliveCreatures, setAliveCreatures] = useState<IPosition[]>([]);
  const [error, setError] = useState<undefined | string>(undefined);

  const handleCreatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCreature({
      ...newCreature,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleGridChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGirdSize(Number(event.target.value));
  };

  const handleCommandsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommands(event.target.value);
  };

  const handleZombieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZombie({
      ...zombie,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleAddCreature = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreatures([...creatures, newCreature]);
  };

  const handleRemoveCreature = (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();
    const renewedCreatures = [...creatures];
    renewedCreatures.splice(index, 1);
    setCreatures(renewedCreatures);
  };

  const handleStartGame = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const data: IPositionsRequest = { gridSize, zombie, commands: commands.toUpperCase(), creatures };
    try {
      const positionsResponse = await getPositions(data);
      const { zombies, creatures: aliveCreatures } = positionsResponse;
      setFinalZombies(zombies);
      setAliveCreatures(aliveCreatures);
      setStartStatus(true);
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError.response?.data?.error) {
          setError(axiosError.response?.data?.error);
          console.log(axiosError.response?.data?.error);
        }
      }
    }
  };

  const handleResetGame = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setGirdSize(10);
    setCommands("UDLR");
    setZombie({ x: 0, y: 0 });
    setCreatures([]);
    setNewCreature({ x: 0, y: 0 });
    setStartStatus(false);
    setFinalZombies([]);
    setAliveCreatures([]);
    setError(undefined);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "start",
          mx: "0",
          pd: "0",
          backgroundColor: "#D2E9E9",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 520,
            height: 900,
            py: 2,
            "& .MuiTextField-root": { mx: 1, my: 2 },
          }}
        >
          <TextField
            required
            onChange={handleGridChange}
            id="gridSize"
            name="gridSize"
            label="Grid Size"
            value={gridSize}
            sx={{ width: "25rem" }}
            helperText="2-14"
          />
          <TextField
            required
            id="moveList"
            onChange={handleCommandsChange}
            name="moveList"
            label="Move list"
            value={commands}
            sx={{ width: "25rem" }}
            helperText="Zombies move Up(U), Down(D), Left(L), Right(R), 30 moves max"
          />
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              id="zPositionX"
              onChange={handleZombieChange}
              name="x"
              label="Zombie position x"
              sx={{ width: "12rem" }}
              value={zombie.x}
            />
            <TextField
              required
              id="zPositionY"
              onChange={handleZombieChange}
              name="y"
              label="Zombie position y"
              sx={{ width: "12rem" }}
              value={zombie.y}
            />
          </Container>
          <Container sx={{ display: "flex" }}>
            <Button
              onClick={handleStartGame}
              variant="contained"
              size="large"
              color="primary"
              sx={{
                mt: "20rem",
                mx: "auto",
              }}
            >
              START THE GAME
            </Button>
            <Button
              onClick={handleResetGame}
              variant="contained"
              size="large"
              color="primary"
              sx={{
                mt: "20rem",
                mx: "auto",
              }}
            >
              RESET
            </Button>
          </Container>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: 520,
            height: 900,
            p: 2,
            "& .MuiTextField-root": { mx: 1, my: 2 },
          }}
        >
          <Container
            component="form"
            onSubmit={handleAddCreature}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              id="cPositionX"
              name="x"
              value={newCreature.x}
              onChange={handleCreatureChange}
              label="Creature position x"
              sx={{ width: "10rem" }}
            />
            <TextField
              required
              id="cPositionY"
              name="y"
              value={newCreature.y}
              onChange={handleCreatureChange}
              label="Creature position y"
              sx={{ width: "10rem" }}
            />
            <Button
              disabled={creatures.length >= 12}
              type="submit"
              sx={{
                height: "3rem",
                width: "4rem",
                mt: "20px",
              }}
            >
              ADD
            </Button>
          </Container>
          <Divider />
          <Typography
            variant="h5"
            component="h5"
            sx={{ mx: "auto", mt: "1rem" }}
          >
            Creatures List
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {creatures.map((item, index) => (
              <Box
                key={index}
                component="form"
                onSubmit={(event) => handleRemoveCreature(event, index)}
                sx={{
                  width: "15rem",
                  pl: "0",
                  "& .MuiTextField-root": { width: "4rem" },
                }}
              >
                <TextField
                  disabled
                  id="cPositionX"
                  name="cPositionX"
                  value={item.x}
                />
                <TextField
                  disabled
                  id="cPositionY"
                  name="cPositionY"
                  defaultValue={item.y}
                />
                <Button
                  type="submit"
                  sx={{
                    height: "3rem",
                    mt: "20px",
                  }}
                >
                  REMOVE
                </Button>
              </Box>
            ))}
          </Container>
        </Box>
      </Container>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "black" }} />
      <Container>
        <Typography
          variant="h5"
          component="h5"
          align="center"
          sx={{ pt: "2rem", pb: "3rem" }}
        >
          {startStatus ? "Final Position" : "Initial Position"}
        </Typography>
        {!startStatus ? (
          <GameBoard
            gridSize={gridSize}
            zombies={[zombie]}
            creatures={creatures}
            error={error}
          />
        ) : (
          <GameBoard
            gridSize={gridSize}
            zombies={finalZombies}
            creatures={aliveCreatures}
            error={error}
          />
        )}
      </Container>
    </>
  );
};

export default InputForm;
