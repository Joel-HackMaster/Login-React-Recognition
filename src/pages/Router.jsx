import * as React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Dashboard } from "./Dashboard/Dashboard";
import getLPTheme from '../components/themes/getLPTheme';

export function Router() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true); //Esta funcion hook amarra a la variable showCustomTheme con la funcion setShowCustomTheme aqui estamos inicializando el valor de la variable con true
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev); //Estra funcion hara que varie showCustomTheme como un booleano entre V y F pero como vemos en la funcion Hook esta se iniciliza con true
      };

      const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
      }

  return (
    <ThemeProvider theme={LPtheme}>
        <CssBaseline/>
        <NavBar mode={mode} toggleColorMode={toggleColorMode}/>
        <Routes>
            {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        </Routes>
    </ThemeProvider>
  )
}
