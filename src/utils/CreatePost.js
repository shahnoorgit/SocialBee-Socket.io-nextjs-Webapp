const createPost = async ({ caption, image, user, likedby }) => {
  try {
    // Construct FormData object

    // Send request using fetch

    const response = await fetch("http://localhost:5000/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caption,
        image,
        user,
        likedby,
      }),
    });

    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default createPost;
