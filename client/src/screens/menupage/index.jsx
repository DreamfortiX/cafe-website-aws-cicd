import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, useTheme } from '@mui/material';
import { withStyles } from "@mui/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Phone, Mail } from '@mui/icons-material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccountCircle from '@mui/icons-material/AccountCircle';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from "../../components/menupdf/menu.pdf";
import moto from "../../components/images/motorcyclist.jpg";
import actress from "../../components/images/actress.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./menu.css";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewInfo, refreshReviewInfo, setReviewInfo } from 'state';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CafeMenu = React.forwardRef((props, ref) => {    
    return (
        <div className="demoPage" ref={ref} width={480} height={684} backgroundColor= "black">
            <p>{props.children}</p>
        </div>
    );
});

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#00aaff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#0091ff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "white",
            },
            '&:hover fieldset': {
                borderColor: "white",
            },
            'fieldset': {
                borderColor: "white",
            },
            'input': {
                color: "white"
            },
        '&.Mui-focused fieldset': {
        borderColor: "white",
      },
    },
    }
  })(TextField);

const MenuPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState();
    const [userPicturePath, setUserPicturePath] = useState(null);
    const [focused, setFocused] = useState(false);
    const [reviewed, setReviewed] = useState(false);
    const [reviewMessage, setReviewMessage] = useState("");
    const [reviewMessageWithHash, setReviewMessageWithHash] = useState(null);
    const user = useSelector((state) => state.user);
    const userReview = useSelector((state) => state.reviewInfo)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = useState("");
    const open = Boolean(anchorEl);
    
    console.log(userReview);
    console.log(reviewed);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user)
            setUserPicturePath(user.picturePath);
    }, [])
    

    useEffect(() => {
        if (userReview.length > 0 && user)
        {
            for (let i = 0; i < userReview.length; i++)
            {
                if (userReview[i].email === user.email)
                {
                    setReviewMessage(userReview[i].review);
                    setReviewed(true); 
                }
            }
            if (reviewMessage.includes("#"))
                {
                    const reviewHash = reviewMessage.split("#").slice(1, value.length - 1);
                    setReviewMessage(reviewMessage.split("#")[0])
                    setReviewMessageWithHash(reviewHash);
                }
        }
    }, [userReview]);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    

    const handleMoreverticonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMoreverticonClose = () => {
        setAnchorEl(null);
    };
    
    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleReviewSubmit = () => {
        for (let i = 0; i < userReview.length; i++)
        {
            if (user.email === userReview[i].email)
                dispatch(deleteReviewInfo());
        }
        if (value.includes("#"))
            {
                const reviewHash = value.split("#").slice(1, value.length - 1);
                console.log(value);
                
                setReviewMessage(value.split("#")[0]);
                setReviewMessageWithHash(reviewHash);
                
            }
        dispatch(setReviewInfo({"email": user.email, "review": value}));
    }

    const handleReviewEdit = (event) => {
        setValue(reviewMessage)
        setReviewed(false);
        setFocused(true);
        setAnchorEl(null);
    }

    const handleReviewCancel = () => {
        setFocused(false);
        if (reviewMessage)
            setReviewed(true);
    }

    const handleReviewDelete = () => {
        dispatch(deleteReviewInfo());
        setReviewed(false);
        setReviewMessage("");
        setValue(null);
        setFocused(false);
        setAnchorEl(null);
    }

    console.log(reviewMessageWithHash);
    
 
    useEffect(() => {
        AOS.init({duration: 1600});
        AOS.refresh();
    }, [])
    
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box m={5} p={4} display="flex" flexDirection="column" alignItems="center">
            <Typography data-aos="fade-in" variant='h0' fontWeight="600">
                Café Dulcet Menu
            </Typography>
            <Typography data-aos="fade-in" variant='h3' fontWeight="200">
                Your favorite gourmet cuisines and delectable items in one place
            </Typography>
            <Typography data-aos="fade-in" variant='h6' fontWeight="400" marginBottom={5}>
                All our dishes have been prepared by trained chefs and culinary veterans from around the world
            </Typography>
            <Typography data-aos="fade-in" variant='h6' fontWeight="400" marginBottom={5}>
                Open from 5 AM to 2 AM (12 AM on Mondays)
            </Typography>
        </Box>
            <HTMLFlipBook width={480} height={684}>
            {
                            [...Array(numPages).keys()].map((pNum) => (
                                <CafeMenu key={pNum} number={pNum + 1}>
                                    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pNum} width={480} renderAnnotationLayer={false} renderTextLayer={false} />
                                    </Document>
                                </CafeMenu>
                            ))
                        }
            </HTMLFlipBook>
            <Box width="70%" marginTop={2}>
                <Typography variant='h1' fontWeight="100">
                    Reviews(2)
                </Typography>
                <Box marginTop={4} marginBottom={2} display="flex" flexDirection="row">
                    <img style={{width: "50px", height:"50px", borderRadius: "25px", boxShadow: "1px 1px 4px 1px black"}} src={moto}/>
                    <Typography m={1.5} variant='h5' style={{fontWeight: "200"}}>
                        Alex Oliveira Da Silva - Brazilian former motorcycle racer
                    </Typography>
                </Box>
                <Typography color="#ffae00">
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>                                               
                </Typography>
                <Typography variant='h7' style={{fontStyle: "italic", fontWeight: "400"}}>
                    "The food was exceptional and the atmosphere was serene. The prices were also justified. Looking forward to coming back"
                </Typography>
                <Box marginTop={4} marginBottom={2} display="flex" flexDirection="row">
                    <img style={{width: "50px", height:"50px", borderRadius: "25px", boxShadow: "1px 1px 4px 1px black"}} src={actress}/>
                    <Typography m={1.5} variant='h5' style={{fontWeight: "200"}}>
                        Selena Lopez Diaz - American singer & actress
                    </Typography>
                </Box>
                <Typography color="#ffae00">
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>
                    <i class="bi bi-star-fill" style={{marginRight: "4px"}}></i>                                               
                </Typography>
                <Typography variant='h7' style={{fontStyle: "italic", fontWeight: "400"}}>
                    “Just had the most incredible dining experience at Café Dulcet! The ambience was stunning, and every dish was a masterpiece. Huge thanks to the amazing chef and staff for making it such a memorable night. Can’t wait to come back!" 🍽️✨
                    <Typography color="blue" variant='h7'>
                    #Foodie #Blessed #GourmetDelights
                    </Typography>
                </Typography>
            <Box marginTop={4} display="flex" marginBottom={2}>
                {user ? <img 
                style={{
                    width: "50px", 
                    height:"50px", 
                    borderRadius: "25px", 
                    boxShadow: "1px 1px 4px 1px black"}} 
                    src = {`http://localhost:3001/assets/${userPicturePath}`}
                    /> : <AccountCircle style={{height: "50px", width: "50px"}}/>}
                {user && <Typography m={1.5} variant='h5' style={{fontWeight: "200"}}>
                {user.firstName} {user.lastName} - {user.occupation}
                </Typography>}
                { reviewed &&
                    <Box>
                    <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMoreverticonClick}
                sx={{
                    color: `${theme.palette.mode === "dark" ? "'white" : "black"}`,
                    marginTop: "0.5rem",
                    height: "35px",
                    width: "1px"
                }}
            >
                <MoreVertIcon/>
            </Button>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMoreverticonClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx={{
                    width: "150px"
                }}
            >
                <MenuItem onClick={handleReviewEdit}>
                    <Typography marginRight={1.7}>Edit</Typography>
                    <EditOutlinedIcon/>
                </MenuItem>
                <MenuItem onClick={handleReviewDelete}>
                    Delete
                    <DeleteIcon/>
                </MenuItem>
            </Menu>
            </Box>}
            </Box>
            {!reviewed && (<Box><FormControl sx={{width: "100%"}}>
                <CssTextField
                    fullWidth
                    value = {value}
                    variant='standard'
                    onFocus={() => setFocused(true)}
                    onChange={handleChange}
                    label="Write a review"
                    style={{
                        marginTop: "1rem",
                    }}
                />
            {user && focused && <Box display="flex" flexDirection="row" width="100%">
                <Button
                type="submit"
                onClick={handleReviewSubmit}
                sx={{
                    m: "2rem 0",
                    width: "120px",
                    height: "45px",
                    backgroundColor: "#0384fc",
                    borderRadius: "25px",
                    color: "white",
                    marginLeft: "auto",
                    "&:hover": {
                        backgroundColor: "rgb(4, 0, 255, 0.4)"
                    },
                }}
                >
                <Typography variant="h3b">
                    POST
                </Typography>
                </Button>
                <Button
                onClick={handleReviewCancel}
                sx={{
                    m: "2rem 0",
                    width: "120px",
                    height: "45px",
                    backgroundColor: "#ff2a00",
                    borderRadius: "25px",
                    color: "white",
                    marginLeft: "1rem",
                    "&:hover": {
                        backgroundColor: "rgb(255, 72, 0, 0.4)"
                    },
                }}
                >
                <Typography variant="h3b">
                    CANCEL
                </Typography>
                </Button>
            </Box>}
            {!user && (
                <Box display="flex" flexDirection="row" width="100%">
                <Typography marginTop={5}>
                    Please sign-in first to leave a review
                </Typography>
                <Button
                type="submit"
                onClick={() => navigate("/login")}
                sx={{
                    m: "2rem 0",
                    width: "120px",
                    height: "45px",
                    backgroundColor: "#0384fc",
                    borderRadius: "25px",
                    color: "white",
                    marginLeft: "auto",
                    "&:hover": {
                        backgroundColor: "rgb(4, 0, 255, 0.4)"
                    },
                }}
                >
                <Typography variant="h3b">
                    Sign-in
                </Typography>
                </Button>
                </Box>
            )}
            </FormControl> </Box>)}
            {reviewed && <Box><Typography variant='h7' style={{fontStyle: "italic", fontWeight: "400"}}>
                "{reviewMessage.split("#")[0]}"
            </Typography>{reviewMessageWithHash && <Typography variant='h7' style={{fontStyle: "italic", fontWeight: "400", color: "blue"}}>
                {reviewMessageWithHash.map((message) => {
                    return "#" + message
                })}
            </Typography>}</Box>}
            </Box>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" marginTop={10}>
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

export default MenuPage;
