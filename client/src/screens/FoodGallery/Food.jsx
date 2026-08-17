import React, { useState, useEffect } from 'react'
import { Typography, Box, useTheme, IconButton, Button } from '@mui/material';
import { DarkMode, LightMode, Phone, Mail } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListInfo, deleteRateInfo, refreshRateInfo, setListInfo, setMode, setRateInfo } from 'state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import "./food.css";

const Food = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const foodData = useSelector((state) => state.foodData);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const [foodInfo, setFoodInfo] = useState(null);
    const [rateClicked, setRateClicked] = useState(null);
    const [rateHover, setRateHover] = useState(false);
    const [rated, setRated] = useState(false)
    const [RateEquivalentMessage, setRateEquivalentMessage] = useState(null);
    const RateEquivalentMessages = ["I hate it", "I don't like it", "It's average", "I like it", "I love it"];
    const [rating, setRating] = useState(0);
    const userRating = useSelector((state) => state.rateInfo);
    const userList = useSelector((state) => state.listInfo);
    //const ListIndexes = userList.map((item) => item.foodId);
    const ListIndexes = [];
    for (let i = 0; i < userList.length; i++)
    {
        if (token)
        {
            if (userList[i].email === user.email && user)
                ListIndexes.push(userList[i].foodId);
        }
    }
    console.log(ListIndexes);
    useEffect(() => {
        if (userRating.length > 0 && user)
        {
            for (let i = 0; i < userRating.length; i++)
            {
                if (userRating[i].email === user.email && userRating[i].foodId === foodData.id)
                {
                    setRating(userRating[i].rating)
                    setRated(true); 
                }
            }
        }
    }, []);
    
    async function getWikiResponse(url, config) {
        const res = await axios.get(url, config);
        return res;
      };
      useEffect(() => {
          const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=15&exlimit=3&exintro&titles=${foodData.query}&explaintext=1&format=json&formatversion=2&origin=*`
          const wikiConfig = {
            timeout: 6500 * 6500
        };
          getWikiResponse(WIKI_URL, wikiConfig).then(result => {
          setFoodInfo(result.data.query.pages[0].extract);
        })
      }, [foodData.query]);

      const handleRateit = () => {
        if (!token)
            navigate("/login")
        else {
            setRateClicked(true);
        }
      }

      const handleRating = (rate) => {
        setRating(rate);
      }

      const handleEnter = () => {
        setRateHover(true);
      }

      const handleLeave = () => {
        setRateHover(false);
      }

      const handleMove = (value, index) => {
        setRateEquivalentMessage(RateEquivalentMessages[index])
      }

      const handleSubmitRate = () => {
        for (let i = 0; i < userRating.length; i++)
            {
                if (user.email === userRating[i].email && userRating[i].foodId === foodData.id)
                    dispatch(deleteRateInfo(foodData.id));
            }
        dispatch(setRateInfo({"email": user.email, "rating": rating, "foodId": foodData.id}));
        setRated(true);
        setRateClicked(false);
      }

      const handleSubmitListAdd = () => {
        if (!token)
            navigate("/login");
        else
            ListIndexes.includes(foodData.id) ? dispatch(deleteListInfo(foodData.id)) : dispatch(setListInfo({"email": user.email, "foodId": foodData.id, "price": foodData.price, "name": foodData.name}))
      }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" marginTop={5} m={2} p={1}>
                <Typography marginLeft={5} marginRight={16}  onClick={()=>navigate("/")} style={{fontSize: "1rem", fontWeight: "300", cursor: "pointer"}}>
                    WELCOME    
                </Typography>    
                <Typography className={theme.palette.mode === "dark" ? "glow" : ""} onClick={()=>navigate("/")} style={{fontWeight: "600", fontSize: "1.5rem", cursor: "pointer"}}>
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
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box m={2} p={4} border={`2px solid ${theme.palette.mode === "dark" ? "white" : "black" }`} boxShadow={`5px 7px 2px 2px ${theme.palette.mode === "dark" ? "white" : "black" }`}>
                    <img width={1100} src={require(`../../components/images/${foodData.src}`)} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" marginX={12} marginY={5}>
                <Box display="flex" flexDirection="column" width="100%">
                    <Typography variant='h1' marginBottom={2} style={{fontWeight: "200"}}>
                        {foodData.name}
                    </Typography>
                    <Typography variant='h6' marginBottom={2} color="#c2c2c2" fontWeight="200">
                        {foodData.type}
                    </Typography>
                    <Typography variant='h3b' marginBottom={2}>
                        {foodInfo}
                    </Typography>
                    <Typography display="flex" flexDirection="row" marginBottom={2.5}>
                        <Typography variant='h2b' fontWeight="100">
                            {foodData.rating}
                        </Typography>
                        <Typography color="#ff8400" fontSize="1.2rem" m={1.3}>
                            {foodData.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {foodData.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {foodData.rating > 2.0 && foodData.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {foodData.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {foodData.rating > 3.0 && foodData.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {foodData.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {foodData.rating > 4.0 && foodData.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {foodData.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                        </Typography>
                        <Button variant="contained" onClick={handleRateit} sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
                            border: theme.palette.mode === "dark" ? "2px solid white" : "",
                            height: "40px",
                            margin: "0.5rem",
                            textTransform: "none",
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "white" : "#0062ff",
                            color: theme.palette.mode === "dark" ? "black" : "white",
                        }
                        }
                        
                        }>
                            {rated ? (<Box display="flex" flexDirection="row">
                                <Box color={ theme.palette.mode === "light" ? "#00c742" : "#00ff44"}>
                                    <CheckIcon/>
                                </Box>
                                <Typography variant="h7" fontWeight="400">
                                    Rated {rating}
                                </Typography>
                            </Box>) : (
                                <Typography>
                                    Ate it? Rate it
                                </Typography>
                            )}
                        </Button>
                        <Button variant="contained" onClick={handleSubmitListAdd} sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
                            border: theme.palette.mode === "dark" ? "2px solid white" : "",
                            height: "40px",
                            margin: "0.5rem",
                            textTransform: "none",
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "white" : "#0062ff",
                            color: theme.palette.mode === "dark" ? "black" : "white",
                        }
                        }
                        
                        }>
                            {ListIndexes.includes(foodData.id) ? (
                                <Box display="flex" flexDirection="row" marginTop={1}>
                                <Box color={ theme.palette.mode === "light" ? "#00c742" : "#00ff44"}>
                                    <CheckIcon/>
                                </Box>    
                                <Typography>
                                    Added to list
                                </Typography>
                            </Box>
                            ) : 
                            (<Box display="flex" flexDirection="row" marginTop={1}>
                                <Box>
                                    <BookmarkBorderIcon/>
                                </Box>    
                                <Typography>
                                    Add to list
                                </Typography>
                            </Box>)}
                        </Button>
                    </Typography>
                    {
                    <Box>
                    <Box>
                        {rateClicked && <Box display="flex" flexDirection="row">
                            <Box>
                                <Rating
                                onClick={handleRating}
                                onPointerEnter={handleEnter}
                                onPointerLeave={handleLeave}
                                onPointerMove={handleMove}
                                />
                            </Box>
                            <Typography variant='h5' fontWeight="200" m={1}>
                                Rate {foodData.name}
                            </Typography>
                        </Box>}
                        {rateHover && <Typography variant='h7' fontWeight="200" marginLeft={9}>
                            {RateEquivalentMessage}
                        </Typography>}
                    </Box>
                    {rating > 0 && rateClicked && <Button variant="contained" onClick={handleSubmitRate} sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
                            border: theme.palette.mode === "dark" ? "2px solid white" : "",
                            height: "40px",
                            width: "200px",
                            textTransform: "none",
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "white" : "#0062ff",
                            color: theme.palette.mode === "dark" ? "black" : "white",
                        }
                        }
                        
                        }>
                            <Typography variant="h7" fontWeight="400">
                            Submit
                            </Typography>
                        </Button>}
                        </Box>
                        }
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row" alignSelf="flex-end" marginBottom={5}>
                        <Typography variant='h6' m={3}>
                            {foodData.countryName}
                        </Typography>
                        <img width={70} height={70} src={require(`../../components/images/${foodData.country}.png`)}/>
                    </Box>
                    <img width={350} src={require(`../../components/images/${foodData.countryName}.png`)}/>
                </Box>
            </Box>
            <Box p={2} display="flex" flexDirection="column" alignItems="center" width="100%">
                <Typography marginBottom={3}>All trademarks are properties of their respective owners. 2024 © Title™ Ltd. All rights reserved. Images and icons by Freepik, Pixabay, and Flaticons</Typography>
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

export default Food;
