import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Mern-blog");
    data.append("cloud_name", "dd50nx84n");

    try {
      setImageFileUploadError(null);
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
      console.log(result.url);
      setImageFileUrl(result.secure_url);
      setImageFileUploadProgress(100);
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(0);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        {/* Image Upload Preview */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${Math.round(imageFileUploadProgress)}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: { stroke: `rgba(62,152,199, 1)` },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User"
            className="rounded-full w-full h-full object-cover border-4 hover:border-red-500 border-[lightgray]"
          />
        </div>

        {/* Error Message */}
        {imageFileUploadError && (
          <Alert color="failure" className="mt-3">
            {imageFileUploadError}
          </Alert>
        )}

        {/* User Information Fields */}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />

        {/* Update Button */}
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>

      {/* Additional Actions */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
