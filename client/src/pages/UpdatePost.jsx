import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { trusted } from "mongoose";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null); // Selected file
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0); // Progress indicator
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // Error for image upload
  const [imageUploadSuccess, setImageUploadSuccess] = useState(null); // Success message for image upload
  const [formData, setFormData] = useState({}); // Form data
  const [publishError, setPublishError] = useState(null); // Error for post publish
  const [publishSuccess, setPublishSuccess] = useState(null); // Success for post publish
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData);
    try {
      setPublishError(null); // Clear previous errors
      setPublishSuccess(null); // Clear previous success

      const response = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log("Post creation API response:", response);
      const result = await response.json();
      console.log("API result:", result);

      if (!response.ok) {
        setPublishError(result.message || "Failed to create post.");
      } else {
        setPublishSuccess("Post created successfully!");
        setFormData({}); // Reset form data
        navigate(`/post/${result.slug}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setPublishError(error.message || "An error occurred.");
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      setImageFileUploadError("Please select an image to upload.");
      return;
    }

    setImageFileUploadError(null);
    setImageUploadSuccess(null); // Clear previous success
    setImageFileUploadProgress(0); // Reset progress

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Mern-blog");
    data.append("cloud_name", "dd50nx84n");

    try {
      console.log("Uploading image to Cloudinary...");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dd50nx84n/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload the image. Please try again.");
      }

      const result = await response.json();
      console.log("Cloudinary response:", result);
      setImageFileUploadProgress(100); // Indicate completion
      setFormData({ ...formData, image: result.secure_url }); // Add image to form
      setImageUploadSuccess("Image uploaded successfully!"); // Show success message
    } catch (error) {
      console.error("Error during image upload:", error);
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(0); // Reset progress on failure
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />

          <Select
            id="category"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategoried">Select a category</option>
            <option value="javaScript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
            <option value="node.js">Node.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={
              imageFileUploadProgress > 0 && imageFileUploadProgress < 100
            }
          >
            {imageFileUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {/* Upload Messages */}
        {imageFileUploadError && (
          <p className="text-red-500 text-sm">{imageFileUploadError}</p>
        )}
        {imageUploadSuccess && (
          <p className="text-green-500 text-sm">{imageUploadSuccess}</p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something ....."
          className="h-72 mb-12"
          required
          onChange={(content) => setFormData({ ...formData, content })}
          value={formData.content}
        />

        {/* Submit Button */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>

        {/* Publish Messages */}
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {publishSuccess && (
          <Alert className="mt-5" color="success">
            {publishSuccess}
          </Alert>
        )}
      </form>
    </div>
  );
}
