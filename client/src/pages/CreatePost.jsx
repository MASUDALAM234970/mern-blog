import React, { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const CreatePost = () => {
  const [file, setFile] = useState(null); // State for storing the selected file
  const [imageFileUrl, setImageFileUrl] = useState(null); // State for the uploaded image URL
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0); // Progress indicator
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // Error message for image upload
  const [formData, setFormData] = useState({}); // State for storing form data

  const handleUploadImage = async () => {
    console.log("File state on upload:", file); // Debugging log to check the file
    if (!file) {
      setImageFileUploadError("Please select an image to upload.");
      console.error("No file selected!"); // Debugging error log
      return;
    }

    setImageFileUploadError(null); // Clear any existing errors
    setImageFileUploadProgress(0); // Reset progress to 0

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Mern-blog");
    data.append("cloud_name", "dd50nx84n");

    try {
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
      console.log("Upload success:", result.url); // Debugging success log
      setImageFileUrl(result.secure_url); // Set the uploaded image URL
      setImageFileUploadProgress(100); // Indicate completion of upload
      setFormData({ ...formData, profilePicture: result.url }); // Update form data
    } catch (error) {
      console.error("Upload error:", error); // Debugging error log
      setImageFileUploadError(error.message); // Show the error message
      setImageFileUploadProgress(0); // Reset progress on failure
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col space-y-5">
        {/* Title and Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategoried">Select a category</option>
            <option value="javaScript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
            <option value="node.js">Node.js</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              console.log("File selected:", selectedFile); // Debugging log for selected file
              if (selectedFile) {
                setFile(selectedFile); // Update the file state
              } else {
                setImageFileUploadError("No file selected.");
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={
              imageFileUploadProgress > 0 && imageFileUploadProgress < 100
            } // Disable during upload
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

        {/* Error Message for Image Upload */}
        {imageFileUploadError && (
          <p className="text-red-500 text-sm">{imageFileUploadError}</p>
        )}

        {/* Post Content */}
        <ReactQuill
          theme="snow"
          placeholder="Write something ....."
          className="h-72 mb-12"
          required
        />

        {/* Submit Button */}
        <Button gradientDuoTone="purpleToBlue">Publish</Button>
      </form>
    </div>
  );
};
