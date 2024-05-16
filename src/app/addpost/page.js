"use client";
import createPost from "@/utils/CreatePost";
import { useSession } from "next-auth/react";
import { useState } from "react";

const PostForm = () => {
  const [caption, setCaption] = useState("");
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !image) {
      setErrorMessage("Please provide a caption and select an image");
      return;
    }

    // Convert image file to base64 string
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];
      const data = {
        caption: caption,
        image: base64String,
        user: session?.dbuser._id,
        likedby: session?.user.name,
      }; // Send base64 string instead of file
      try {
        await createPost(data);
        setCaption("");
        setImage(null);
        setErrorMessage("");
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    };
    reader.readAsDataURL(image);
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB");
    } else {
      setErrorMessage("");
      setImage(selectedImage);
    }
  };

  return (
    <div>
      <h2>Submit a Post</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={!caption || !image}>
          Submit
        </button>
      </form>
      {image && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default PostForm;
