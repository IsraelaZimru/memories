import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post); // using model to create new obj
  try {
    await newPost.save(); //tring to save asny new document in DB

    res.status(201).json(newPost); //success creating new document
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
