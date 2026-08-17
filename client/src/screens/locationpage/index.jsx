import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Typography, Box, useTheme, IconButton } from '@mui/material'
import { DarkMode, LightMode, Phone, Mail } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import marker from "../../components/images/marker.png";
import 'leaflet/dist/leaflet.css';
const myIcon = new Icon({
 iconUrl: marker,
 iconSize: [32,32]
})


const styles = {
    mapRoot: {
      height: 400,
    },
  };

const LocationPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dark = theme.palette.neutral.dark;

  return (
    <Box>
        <Box display="flex" justifyContent="space-between" marginTop={5} m={2} p={1}>
                <Typography marginLeft={5} marginRight={16}  onClick={()=>navigate("/")} style={{fontSize: "1rem", fontWeight: "300", cursor: "pointer"}}>
                    WELCOME    
                </Typography>    
                <Typography onClick={()=>navigate("/")} style={{fontWeight: "600", fontSize: "1.5rem", cursor: "pointer"}}>
                    C A F É ⠀D U L C E T
                </Typography>
                <Box display="flex" justifyContent="space-between" width="20%" marginRight={5}>
                    <Typography onClick={() => navigate("/menu")} style={{fontSize: "1rem", fontWeight: "300", cursor: "pointer"}}>
                        MENU
                    </Typography>
                    <Typography onClick={() => navigate("/location")} style={{fontSize: "1rem", fontWeight: "300", cursor: "pointer"}}>
                        LOCATION AND HOURS
                    </Typography>
                    <IconButton onClick={() => dispatch(setMode())} sx={{padding: "0px", height: "20px"}}>
                        {theme.palette.mode === "dark" ? (
                            <Tooltip title="Dark Mode"><DarkMode sx={{ fontSize: "25px" }} /></Tooltip>
                        ): (
                            <Tooltip title="Light Mode"><LightMode sx={{ color: dark, fontSize: "25px" }}/></Tooltip>
                        )}
                    </IconButton>
                </Box>
            </Box>
        <Box m={5} p={4} marginBottom={2} display="flex" flexDirection="column">
            <Typography variant='h2' marginLeft={7} marginBottom={3}>
                Location (Fictitious)
            </Typography>
            <Typography variant='h2' style={{fontSize: "1rem"}} marginLeft={7}>
                32 Heron St. <br/> San Francisco CA 94106 <br/> <br/> Beside Grande Vitesse Systems (GVS) office building in the neighbourhood of Fremont, San Francisco
            </Typography>
        </Box>
        <Box width={1100} marginRight="auto" marginLeft="auto" marginBottom={10}>
            <MapContainer center={[37.7746, -122.4086]} zoom={13} scrollWheelZoom={false} style={styles.mapRoot}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[37.7746, -122.4086]} icon={myIcon}>
                    <Popup>
                    Café Dulcet - Your all in one café <br/> <br/> 123 Heron Street <br/> San Francisco, CA
                    </Popup>
                </Marker>
                </MapContainer>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                <Typography marginBottom={3}>All trademarks are properties of their respective owners. 2024 © Title™ Ltd. All rights reserved.</Typography>
                <Box display="flex">
                    <Mail />
                    <Typography marginLeft={1} marginRight={4}>cafe@yahoomail.com</Typography>
                    <Phone/>
                    <Typography marginLeft={1}>+91-33-17296023</Typography>
                </Box>
            </Box>
    </Box>
    
  )
}

export default LocationPage
