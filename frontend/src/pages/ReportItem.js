import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./ReportItem.css";

function ReportItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await API.post("/items", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Item Reported Successfully");
      navigate("/user-dashboard");
    } catch (err) {
      console.log(err);
      alert("Item Reporting Failed");
    }
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <h2>Report Lost / Found Item</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>

          <div className="input-group">
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>

          <div className="input-group">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div className="input-group">
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label>Location</label>
          </div>

          <div className="file-upload">
            <input
              type="file"
              id="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="file">
              {image ? image.name : "Upload Image"}
            </label>
          </div>

          <button className="submit-btn">Submit Item</button>
        </form>
      </div>
    </div>
  );
}

export default ReportItem;