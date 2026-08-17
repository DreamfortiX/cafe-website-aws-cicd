import { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
//import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box
            backgroundColor={theme.palette.background.alt}
            >
                <Form/>
            </Box>
            
        </Box>
    )
}

export default LoginPage;