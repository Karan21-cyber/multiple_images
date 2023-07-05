import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter key press
      handleSubmit();
    }
  };

  const handleClick = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (!name || !price || !description || !quantity || !images) {
      alert("all fields are required");
    } else {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("quantity", quantity);
      Array.from(images).forEach((item) => {
        formData.append("images", item);
      });

      const url = "http://localhost:5000/api/uploads";

      const data = await axios.post(url, formData);

      if (data.status === 200) {
        alert("Data upload successfully");
      } else {
        alert("Unable to upload data");
      }
    }
  };

  return (
    <div className="form-container">
      <div>
        <label>Product Images</label>
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          onKeyDown={handleKeyPress}
        />
      </div>

      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div>
        <label>Product Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div>
        <label>Product Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div>
        <label>Product Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <button onClick={handleClick}>Upload</button>
    </div>
  );
}

export default AddProduct;
