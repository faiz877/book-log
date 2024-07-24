import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    dateRead: initialData.dateRead || "",
    coverImage: initialData.coverImage || "",
  });
  const [imagePreview, setImagePreview] = useState(
    initialData.coverImage || ""
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If the field is coverImage, update the image preview
    if (name === "coverImage") {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date Read"
            name="dateRead"
            type="date"
            value={formData.dateRead}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cover Image URL"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </Grid>
        {imagePreview && (
          <Grid item xs={12}>
            <img
              src={imagePreview}
              alt="Cover Preview"
              style={{ maxWidth: "100%", height: "auto", marginTop: 10 }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {initialData.id ? "Update Book" : "Add Book"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
