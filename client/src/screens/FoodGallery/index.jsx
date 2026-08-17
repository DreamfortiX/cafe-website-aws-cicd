import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Box, useTheme, Grid, InputBase, IconButton } from '@mui/material'
import { Phone, Mail } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setFoodData } from 'state';
import foodData from './extendedFoodData';

const FoodGalleryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [search, setSearch] = useState("");
    const [
    vegAppetizer, 
    soups, 
    appetizerChicken, 
    appetizerFish, 
    appetizerLamb, 
    appetizerSeafood, 
    breakfastNonveg, 
    breakfastVeg,
    snacks,
    maincourseRice
    ] = useMemo(() => {
    const [VA, S, AC, AF, AL, AS, ABN, ABV, SN, MCR] = Array.from({length: 10}, () => []);
    foodData.map((item) => {
        if (item.category === "veg-appetizer")
            VA.push(item);
        else if (item.category === "soup")
            S.push(item);
        else if (item.category === "appetizer-chicken")
            AC.push(item);
        else if (item.category === "appetizer-fish")
            AF.push(item);
        else if (item.category === "appetizer-lamb")
            AL.push(item);
        else if (item.category === "appetizer-seafood")
            AS.push(item);
        else if (item.category === "appetizer-breakfastnonveg")
            ABN.push(item);
        else if (item.category === "appetizer-breakfastveg")
            ABV.push(item);
        else if (item.category === "snacks")
            SN.push(item);
        else if (item.category === "maincourse-rice")
            MCR.push(item);

    })
    return [VA, S, AC, AF, AL, AS, ABN, ABV, SN, MCR];
  });

  const VegAppetizer = vegAppetizer.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const Soups = soups.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const AppetizerChicken = appetizerChicken.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const AppetizerFish = appetizerFish.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const AppetizerLamb = appetizerLamb.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const AppetizerSeafood = appetizerSeafood.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const BreakfastNonveg = breakfastNonveg.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const BreakfastVeg = breakfastVeg.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const Snacks = snacks.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  const MaincourseRice = maincourseRice.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
  
  return (
    <Box marginTop={5}>
        <Box m={5} marginLeft={9} sx={{
            border: theme.palette.mode === "dark" ? "2px solid white" : "2px solid black",
            bgcolor: theme.palette.mode === "dark" ? "black" : "white",
            width: "650px",
        }}>
            <InputBase 
            style={{
                ".css-yz9k0d-MuiInputBase-input": {
                    color: "black"
                }
            }}
            sx={{
                width: "600px",
                height: "40px",
                input: {
                    cursor: "text"
                },
                ".css-yz9k0d-MuiInputBase-input": {
                    color: "black",
                },
                paddingLeft: "1rem",
                fontSize: "1rem"
            }} 
            onChange={handleSearch}
            placeholder='Search for dishes'/>
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </Box>
    {VegAppetizer.length > 0 && <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Appetizers (Veg)
    </Typography>}
    {VegAppetizer.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {VegAppetizer.map((item) => {
                  console.log(item);
                  
                  return (
                      <Grid item xs={4}>
                      <Box color="white" onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box color="white"  p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {Soups.length > 0 && <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Soups
    </Typography>}
    {Soups.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {Soups.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {AppetizerChicken.length > 0 && <Box><Typography variant='h0' fontWeight="600" m={5} p={4}>
        Appetizers (Non-Veg)
    </Typography>
    <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Chicken
    </Typography></Box>}
    {AppetizerChicken.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {AppetizerChicken.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {AppetizerFish.length > 0 && <Box><Typography variant='h0' fontWeight="600" m={5} p={4}>
        Appetizers (Non-Veg)
    </Typography>
    <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Fish
    </Typography></Box>}
    {AppetizerFish.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {AppetizerFish.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {AppetizerLamb.length > 0  && <Box><Typography variant='h0' fontWeight="600" m={5} p={4}>
        Appetizers (Non-Veg)
    </Typography>
    <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Lamb
    </Typography></Box>}
    {AppetizerLamb.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {AppetizerLamb.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {AppetizerSeafood.length > 0 && <Box><Typography variant='h0' fontWeight="600" m={5} p={4}>
        Appetizers (Non-Veg)
    </Typography>
    <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Seafood
    </Typography></Box>}
    {AppetizerSeafood.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {AppetizerSeafood.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {BreakfastNonveg.length > 0 && <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Breakfast (Non-Veg)
    </Typography>}
    {BreakfastNonveg.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {BreakfastNonveg.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {BreakfastVeg.length > 0 &&<Typography variant='h0' fontWeight="600" m={5} p={4}>
        Breakfast (Veg)
    </Typography>}
    {BreakfastVeg.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {BreakfastVeg.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {Snacks.length > 0 && <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Snacks
    </Typography>}
    {Snacks.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {Snacks.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  {MaincourseRice.length > 0 && <Box><Typography variant='h0' fontWeight="600" m={5} p={4}>
        Main Course
    </Typography>
  <Typography variant='h0' fontWeight="600" m={5} p={4}>
        Rice
    </Typography></Box>}
    {MaincourseRice.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {MaincourseRice.map((item) => {
                  return (
                      <Grid item xs={4}>
                      <Box onClick={() => {
                          dispatch(setFoodData(item))
                          navigate(`/food-gallery/${item.path}`)
                      }
                          } height={400} bgcolor="rgb(0,0,0)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="foodcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={require(`../../components/images/${item.src}`)}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="white" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                          {item.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 2.0 && item.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 3.0 && item.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                                          {item.rating > 4.0 && item.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                                          {item.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                                      </Typography>
                                  </Typography>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                              <Typography m={1}>
                                {item.countryName}
                              </Typography>
                              <img width={40} height={40} src={require(`../../components/images/${item.country}.png`)}/>
                              </Box>
                          </Box>
                          <Box p={2} paddingTop={1}>
                          <Typography variant='h7' color="white" style={{fontStyle: "italic"}}>
                            {item.description}
                          </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                <Typography marginBottom={3}>All trademarks are properties of their respective owners. 2024 © Title™ Ltd. All rights reserved. Images and icons by Adobe Stock, Freepik, Pixabay, and Flaticons</Typography>
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

export default FoodGalleryPage
