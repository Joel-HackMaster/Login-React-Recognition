import * as React from "react";
import { useForm } from "react-hook-form";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GoogleIcon from "../../components/GoogleIcon.jsx";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/api.js";
import { SnackBar } from "../../components/SnackBar.jsx";
import Slide from '@mui/material/Slide';
import Webcam from "react-webcam";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export function SignInComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [photo, setPhoto] = React.useState("");
  const webcamRef = React.useRef(null);
  const [isCameraEnabled, setIsCameraEnabled] = React.useState(false);
  


  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setIsCameraEnabled(false);
  };

  const ColorSchemaButton = (props) => {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
      <IconButton
        aria-label="toogle light/dark mode"
        size="sm"
        variant="outlined"
        disabled={!mounted}
        onClick={(event) => {
          setMode(mode === "light" ? "dark" : "light");
          onClick?.(event);
        }}
        {...other}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
        email: data.email,
        password: data.password,
        image: photo
    }
    const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    if(!response.ok){
        const errorData = await response.json()
        console.log(errorData.detail)
        return;
    }

    const responseData = await response.json();
    sessionStorage.setItem('token', responseData.access_token);
    sessionStorage.setItem('refresh', responseData.refresh_token);
    sessionStorage.setItem('photo', responseData.photo);
    sessionStorage.setItem('email', responseData.email);
    sessionStorage.setItem('full_name', responseData.full_name);
    console.log(responseData)
    navigate(`/pages/Dashboard`)
  });



  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            with: "100%",
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.3s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Logo Company</Typography>
            </Box>
            <ColorSchemaButton />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Inicio de Sesion
                </Typography>
                <Typography level="body-sm">
                  ¿Aun no tienes una cuenta?{" "}
                  <Link href="/register" level="title-sm">
                    Registrate
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continuar con Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              o
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={onSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <FormLabel>Reconocimiento Facial</FormLabel>
                  {isCameraEnabled ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{
                          width: "70%",
                          borderRadius: "20px",
                          boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                        }}
                      />
                      <Button sx={{ mt: 2 }} onClick={capture}>
                        Tomar Foto
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsCameraEnabled(true)}>
                      Habilitar Cámara
                    </Button>
                  )}
                  {photo && (
                    <img
                      src={photo}
                      alt="Foto capturada"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                  <input
                    type="hidden"
                    {...register("photo", { validate: () => photo !== "" || "Photo is required", })}
                    name="photo"
                    value={photo || " "}
                  />
                  {errors.photo && (
                    <Typography color="warning">
                      Es necesario completar el reconocimiento facial
                    </Typography>
                  )}
                </Box>
                  <Typography>Email</Typography>
                  <Input
                    placeholder="Ingresa tu email"
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                  />
                  {errors.email && (
                    <Typography color="danger">
                      This field is required
                    </Typography>
                  )}
                  <Typography>Password</Typography>
                  <Input
                    placeholder="Ingresa tu contraseña"
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                  />
                  {errors.password && (
                    <Typography color="danger">
                      This field is required
                    </Typography>
                  )}
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Recuerdame" name="persistent" />
                    <Link level="title-sm" href="#replace-with-a-link">
                      ¿Olvidaste tu contaseña?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Iniciar Sesion
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Creado por Joel Sanchez pasado de TypeScript JUI a JS JUI{" "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
