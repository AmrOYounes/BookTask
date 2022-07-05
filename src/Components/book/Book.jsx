import { Grid, InputAdornment } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import TextField from "../TextField";
import { Formik, Form, Field } from "formik";
import PublisherDialog from "../PublisherDialog";
import AuthorDialog from "../AuthorDialog";
import * as Yup from "yup";
import DateTimePicker from "../DatePicker";
import Select from "../Select";
import FileInput from "../FileInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { NavLink, Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getPublishers,
  addPublisher,
  getAuthors,
  getCountries,
  addAuthor,
  addBook,
} from "../../Actions/APIs/BookAPI";
import "./book.style.scss";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import axios from "axios";

const initialValues = {
  bookID: "",
  title: "",
  publisher: "",
  date: "",
  author: "",
  files: null,
  tags: [],
  units: "",
  price: "",
};

const validationSchema = Yup.object({
  bookID: Yup.number()
    .typeError("you must specify a number")
    .required("Required"),
  title: Yup.string().required("Required"),
  publisher: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
  date: Yup.date().required("Required"),
  author: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
  files: Yup.mixed()
    .required("You need to provide a file")
    .test("type", "only .pdf format", (values) => {
      if (values) {
        for (let i = 0; i < values.length; i++) {
          if (values[i] && values[i].type !== "application/pdf") return false;
        }
        return true;
      }
    }),
  tags: Yup.array().min(1).required("Required"),
  units: Yup.number()
    .typeError("you must specify a number")
    .required("Required"),
  price: Yup.number()
    .typeError("you must specify a number")
    .required("Required"),
  //   .email('Invalid email format')
  //   .required('Required'),
  // password: Yup.string().required('No password provided.').min(8,'Password is too short - should be 8 chars minimum.'),
  // cpassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function Book() {
  const ref = useRef();
  const tagsRef = useRef();
  const [isSubmit, setIsSubmit] = useState(false);
  const [bookPublisher, setBookPublisher] = useState([]);
  const [bookAuthor, setBookAuthor] = useState([]);
  const [publisherDialog, setPublisherDialog] = React.useState(false);
  const [authorDialog, setAuthorDialog] = React.useState(false);
  const [countries, setCountries] = useState([]);

  const customStyles = {
    control: (base, state) => {
      return {
        ...base,
        height: 55,
        minHeight: 35,
        border: isSubmit && "1px solid blue",
      };
    },
  };

  const updateDialogState = (dialogName, value) => {
    dialogName === "publisher"
      ? setPublisherDialog(value)
      : setAuthorDialog(value);
  };

  const handleClickOpen = (dialogName) => {
    if (dialogName === "publisherDialog") {
      setPublisherDialog(true);
    } else {
      setAuthorDialog(true);
    }
  };

  const handleAddNewPublisher = (params) => {
    // const publisherParams = {
    //   Publisher_name: publisherName,
    //   Establish_date: establishDate,
    //   Is_working: isWorking
    // }
    addPublisher(params).then((res) => {
      handleClose("publisherDialog");
      getPublishers()
        .then((res) => {
          return res.data.map((publisherObject) => ({
            label: publisherObject.Publisher_name,
            value: publisherObject.Publisher_name,
            id: publisherObject.id,
          }));
        })
        .then((response) => {
          setBookPublisher(response);
        });
    });
  };

  const handleAddAuthor = (params) => {
    const { birthDate, country, deathDate, fName, lName, mName, website } =
      params;
    const authorData = {
      First_name: fName,
      Middle_name: mName,
      Last_name: lName,
      Birth_date: birthDate,
      Country_of_residence: country.label,
      Death_date: deathDate,
      Offical_website: website,
    };

    addAuthor(authorData).then((res) => {});
    handleClose("authorDialog");
    getAuthors()
      .then((res) => {
        return res.data.map((authorObject) => ({
          label: `${authorObject.First_name} ${authorObject.Last_name}`,
          value: `${authorObject.First_name} ${authorObject.Last_name}`,
          id: authorObject.id,
        }));
      })
      .then((response) => {
        setBookAuthor(response);
      })
      .catch((err) => {});
  };

  const handleClose = (dialogName) => {
    if (dialogName === "publisherDialog") {
      setPublisherDialog(false);
    } else {
      setAuthorDialog(false);
    }
  };

  const handleSubmitBook = (values, { resetForm }) => {
    const {
      units,
      title,
      tags,
      publisher,
      price,
      files,
      date,
      bookID,
      author,
    } = values;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("Book_path[]", files[i]);
    }
    for (let tag of tags) {
      formData.append("tags[]", tag);
    }
    formData.append("Available_units", units);
    formData.append("author_Id", author.id);
    formData.append("Book_id", bookID);
    formData.append("publisher_Id", publisher.id);
    formData.append("Book_title", title);
    formData.append("Publish_date", date);
    formData.append("Unit_price", price);
    addBook(formData).then((res) => {
      resetForm();
      ref.current.value = "";
    });
  };

  useEffect(() => {
    getCountries()
      .then((res) => {
        return res.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
      })
      .then((response) => {
        setCountries(response);
      });

    getPublishers()
      .then((res) => {
        return res.data.map((publisherObject) => ({
          label: publisherObject.Publisher_name,
          value: publisherObject.Publisher_name,
          id: publisherObject.id,
        }));
      })
      .then((response) => {
        setBookPublisher(response);
      })
      .catch((err) => {
        // window.location.reload();
      });

    getAuthors()
      .then((res) => {
        return res.data.map((authorObject) => ({
          label: `${authorObject.First_name} ${authorObject.Last_name}`,
          value: `${authorObject.First_name} ${authorObject.Last_name}`,
          id: authorObject.id,
        }));
      })
      .then((response) => {
        setBookAuthor(response);
      });
  }, []);

  return (
    <Grid container justifyContent="center" className="main-container">
      {/* Publisher dialig  */}
      {publisherDialog && (
        <PublisherDialog
          publisherDialogState={publisherDialog}
          updateDialogState={updateDialogState}
          handleAddNewPublisher={handleAddNewPublisher}
        />
      )}

      {authorDialog && (
        <AuthorDialog
          authorDialogState={authorDialog}
          updateDialogState={updateDialogState}
          countries={countries}
          handleAddAuthor={handleAddAuthor}
        />
      )}

      <Grid item xs={8} textAlign="center" className="header-title">
        <h3>ADD NEW BOOK</h3>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitBook}
      >
        <Grid item xs={8} className="book-form" sx={{ marginBottom: 10, marginTop: 10 }}>
          <Form style={{ width: "100%" }}>
            <Grid item xs={12} marginBottom={3} marginTop={10}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} textAlign="left">
                  <label>Book ID </label>
                </Grid>
                <Grid item xs={8} md={4}>
                  <TextField id="bookID" name="bookID" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} textAlign="left">
                  <label>Book title </label>
                </Grid>
                <Grid item xs={8} md={4}>
                  <TextField id="title" label="Outlined" name="title" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} textAlign="left">
                  <label>Book Publisher </label>
                </Grid>
                <Grid item xs={7} md={4}>
                  <Grid container>
                    <Grid item md={11}>
                      <Select options={bookPublisher} name="publisher" />
                    </Grid>
                    <Grid item md={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleClickOpen("publisherDialog")}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item xs={1}   style={{maxWidth:'70px'}}>
       
       </Grid> */}
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Publish date </label>
                </Grid>
                <Grid item xs={8} md={4} style={{ maxWidth: "470px" }}>
                  <DateTimePicker name="date" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Book Author </label>
                </Grid>
                <Grid item xs={7} md={4}>
                  <Grid container>
                    <Grid item md={11}>
                      <Select options={bookAuthor} name="author" />
                    </Grid>
                    <Grid item md={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleClickOpen("authorDialog")}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Book PDF </label>
                </Grid>
                <Grid item xs={8} md={4} style={{ maxWidth: "470px" }}>
                  <Field name="files">
                    {(props) => {
                      const { field, form, meta } = props;
                      const { setFieldValue, setFieldTouched } = form;

                      return (
                        <>
                          <input
                            id="files"
                            multiple
                            name="files"
                            ref={ref}
                            type="file"
                            onChange={(event) => {
                              // setTouched("files",true)
                              setFieldTouched("files", true);
                              setFieldValue("files", event.currentTarget.files);
                            }}
                          />
                          {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                          )}
                        </>
                      );
                    }}
                  </Field>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Book tags </label>
                </Grid>
                <Grid item xs={8} md={4} style={{ maxWidth: "470px" }}>
                  <Field name="tags">
                    {(props) => {
                      const { field, form, meta } = props;

                      const { setFieldValue } = form;
                      //  if(meta.touched && meta.error&&field.value.length === 0){
                      //   tagsRef.current.style.background  ='red';
                      //  }
                      return (
                        <>
                          <TagsInput
                            ref={tagsRef}
                            value={field.value}
                            onChange={(values) => {
                              setFieldValue("tags", values);
                            }}
                          />
                          {meta.touched &&
                            meta.error &&
                            field.value.length === 0 && (
                              <div className="error"> {meta.error}</div>
                            )}
                        </>
                      );
                    }}
                  </Field>
                  {/* <TagsInput   value={bookTags}  onChange={handleTags}/> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Available Units </label>
                </Grid>
                <Grid item xs={8} md={4} style={{ maxWidth: "470px" }}>
                  <TextField id="units" type="number" name="units" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={3}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={1} style={{ maxWidth: "114px" }}>
                  <label>Unit Price </label>
                </Grid>
                <Grid item xs={8} md={4} style={{ maxWidth: "470px" }}>
                  <TextField
                    id="price"
                    name="price"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} marginBottom={10}>
              <Grid container justifyContent="center">
                <Button variant="contained" type="submit">
                  Submit book
                </Button>

                <Button variant="contained" sx={{ marginLeft: "20px" }}>
                  <Link to="/booksearch">Book Search</Link>
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Grid>
      </Formik>
      <Grid item xs={12} textAlign="center"></Grid>
    </Grid>
  );
}

export default Book;
