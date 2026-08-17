import React from 'react'
import { Box, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CancelPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const totalPrice = useSelector((state) => state.totalPrice);
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" display="flex" flexDirection="row" bgcolor="#ff2212" p={1}>
                <Typography sx={{
                    marginLeft: "47%",
                    marginRight: "0.5%"
                }} variant='h4'>
                    $ {totalPrice}
                </Typography>
                <CancelIcon/>
            </Box>
            <Box m={10}>
                <Box display="flex" flexDirection="column">
                    <Typography variant='h0'>
                        Payment Cancelled
                    </Typography>
                    <Typography variant='h3b'> 
                        Your order has been cancelled.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={5}>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/")} sx={{
                        textDecorationLine: "underline",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                            },
                    }} variant='h6'>
                        Return back to home
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate(`/profile/${user.firstName}-${user.lastName}`)} sx={{
                        textDecorationLine: "underline",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                            },
                    }} variant='h6'>
                        Return back to shopping cart
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CancelPage
