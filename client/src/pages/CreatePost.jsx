import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex 1"
          />
          <Select>
            <option value="uncategoried">Select a category</option>
            <option value="javaScript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
            <option value="node.js">Node.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput typeof="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write something ....."
          className="h-72 mb-12"
          required
        />
        <Button gradientDuoTone="purpleToBlue">Publish</Button>
      </form>
    </div>
  );
};
