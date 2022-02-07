import React, {FC, ReactElement} from 'react';
import {Box, Container, ThemeProvider} from "@mui/material";
import {Dashboard} from "./pages/Dashboard";
import {theme} from "./theme/theme";

const App: FC = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box component='main'
             sx={{
                 flexGrow: 1,
                 py: 8,
             }}
        >
            <Container maxWidth={false}>
                <Dashboard/>
            </Container>
        </Box>
    </ThemeProvider>
);

export default App;
