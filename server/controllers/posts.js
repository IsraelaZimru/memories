import mongoose from "mongoose";
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

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatePost); //success creating new document
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ message: "Post deleted successfully" }); //success deleted
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  post.likeCount = post.likeCount + 1;
  console.log("post", post.likeCount);
  try {
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
