import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./InputForm.module.css";

const InputForm = (props) => {
  const [formData, setFormData] = useState({
    shoeName: "",
    description: "",
    price: "",
    sizes: { sizeL: false, sizeM: false, sizeS: false },
  });

  const submitHandler = (e) => {
    e.preventDefault();

    // Set hardcoded quantities
    const quantityL = 100;
    const quantityM = 60;
    const quantityS = 10;

    // Pass the data including checkbox values and hardcoded quantities to the parent component
    props.getDataHandler(
      formData.shoeName,
      formData.description,
      Number(formData.price),
      formData.sizes,
      quantityL,
      quantityM,
      quantityS
    );

    // Reset form fields
    setFormData({
      shoeName: "",
      description: "",
      price: "",
      sizes: { sizeL: false, sizeM: false, sizeS: false },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: {
        ...prevData.sizes,
        [`size${size}`]: !prevData.sizes[`size${size}`],
      },
    }));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        type="text"
        label="Shoe Name"
        value={formData.shoeName}
        onChange={(e) => handleInputChange("shoeName", e.target.value)}
      />
      <Input
        type="text"
        label="Description"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <Input
        type="number"
        label="Price"
        value={formData.price}
        onChange={(e) => handleInputChange("price", e.target.value)}
      />
      {["L", "M", "S"].map((size) => (
        <Input
          key={size}
          type="checkbox"
          label={size}
          checked={formData.sizes[`size${size}`]}
          onChange={() => handleCheckboxChange(size)}
        />
      ))}
      <Button className={classes.button} type="submit">
        Add Candy
      </Button>
    </form>
  );
};

export default InputForm;
