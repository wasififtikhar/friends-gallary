"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <span
                style={{
                  color: `black`,
                  fontWeight: `bolder`,
                  fontStyle: `italic`,
                  letterSpacing: `0.5px`,
                }}
              >
                Friends
              </span>
              Gallary
            </Typography>
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/registration")}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div
        style={{
          width: `inherit`,
          heigth: `inherit`,
          textAlign: `center`,
          margin: `0 auto`,
        }}
      ></div>
      <h1>Login and Regestration page</h1>
    </main>
  );
};

export default Home;
