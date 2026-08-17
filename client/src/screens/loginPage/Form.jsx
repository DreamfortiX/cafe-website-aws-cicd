import { useState } from "react";
import {Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Mail, Phone } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import loginimg from "../../components/images/loginimg.jpg";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [errorMessage, setErrorMessage] = useState(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "https://merncafe-server.vercel.app/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    onSubmitProps.resetForm();
    if (savedUser.error)
        setErrorMessage("User already exists");

    if (savedUser.email) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://merncafe-server.vercel.app/auth/login", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    
    if (loggedIn.msg)
        setErrorMessage(loggedIn.msg);

    if (loggedIn.token) {
    onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            'fieldset': {
                borderColor: 'white',
            },
            'input': {
                color: 'white'
            },
        '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    }
  })(TextField);

  return (
    <Box bgcolor={palette.mode === "dark" ? "black" : "white"}>
        <Box width="100%">
            <img width="100%" src={loginimg} style={{position: "absolute", top: "0"}}/>
        </Box>
        <Box width="85%" m={10} marginTop={16} sx={{position: "relative"}}>
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box>
                    <Typography variant="h1" fontWeight="600" fontSize="3rem" color="black">
                        Sign-in today for the best ever experience
                    </Typography>
                </Box>
            <Box width="50%" p={2} bgcolor="rgb(0,0,0,0.3)">
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
                {isRegister && (
                <>
                    <CssTextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                    inputProps={{style: {fontSize: 16, color: "white"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                    />
                    <CssTextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                    inputProps={{style: {fontSize: 16, color: "white"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                    />
                    <CssTextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{style: {fontSize: 16, color: "white"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                    />
                    <CssTextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                        Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{style: {fontSize: 16, color: "white"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                    />
                    <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                    >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            border="2px dashed #005eff"
                            p="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                            <p style={{color: "white"}}>Add Picture Here</p>
                            ) : (
                                <Box>
                                    <Typography>{values.picture.name}</Typography>
                                    <EditOutlinedIcon />
                                </Box>
                            )}
                        </Box>
                        )}
                    </Dropzone>
                    </Box>
                </>
                )}
                <CssTextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                inputProps={{style: {fontSize: 16, color: "white", fontFamily: "poppins"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                />
                <CssTextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                inputProps={{style: {fontSize: 16, color: "white"}}}
                InputLabelProps={{style: {fontSize: 16}}}
                />
                {errorMessage && <Typography color="#f00000" width={200} fontWeight={400}>
                        {errorMessage}
                    </Typography>}
            </Box>
            <Box>
                <Button
                fullWidth
                type="submit"
                sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: "#ff4800",
                    color: "white",
                    "&:hover": {
                        color: "black",
                        backgroundColor: "rgb(255, 72, 0, 0.4)"
                    },
                }}
                >
                <Typography variant="h3b">
                    {isLogin ? "LOGIN" : "REGISTER"}
                </Typography>
                </Button>
                <Box>
                    <Typography
                    variant="h6"
                    color="white"
                    onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                        resetForm();
                    }}
                    sx={{
                        "&:hover": {
                        cursor: "pointer",
                        color: "#005eff"
                        },
                    }}
                    >
                    {isLogin
                        ? "Don't have an account? Sign Up here."
                        : "Already have an account? Login here."}
                    </Typography>
                </Box>
            </Box>
            </Box>
            </Box>
            </form>
        )}
        </Formik>
        </Box>
        <Box
        p={5} 
        bgcolor={palette.mode === "dark" ? "black" : "white"}
        display="flex"
        flexDirection="column"
        alignItems="center" 
        width="100%"
        maxHeight="100%"
        sx={{ 
            position: "relative", 
            bottom: `${ isLogin ? "-320px" : "45px"}`
            }}>
                <Typography marginBottom={3}>
                    All trademarks are properties of their respective owners. 2024 © Title™ Ltd. All rights reserved. Images and icons by Adobe Stock, Freepik, Pixabay, and Flaticons
                </Typography>
                <Box display="flex">
                    <Mail />
                    <Typography marginLeft={1} marginRight={4}>cafe@yahoomail.com</Typography>
                    <Phone/>
                    <Typography marginLeft={1}>+91-33-17296023</Typography>
                </Box>
            </Box>
    </Box>
  );
};

export default Form;