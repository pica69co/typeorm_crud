import { Request, Response } from "express";
import { Post } from "../entities/Post";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }
    return res.status(200).json({
      message: "Posts retrieved",
      posts,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    throw error;
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { title, content } = req.body;
    const post = new Post();
    if (!post) {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
    post.title = title;
    post.content = content;
    await post.save();
    return res.status(201).json({
      message: "Post created",
      post,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    throw error;
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    const postDeleted = await Post.delete({ id: parseInt(id) });
    if (postDeleted.affected === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    console.log("Deleted post successfully");

    return res.status(204).json({
      message: "Post deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    const postFounded = await Post.findOneBy({ id: parseInt(id) });
    if (!postFounded) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({ postFounded });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { first_name, last_name }
    // find user by id
    const post = await Post.findOneBy({ id: parseInt(id) });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    // user.first_name = first_name;
    // user.last_name = last_name;

    Post.update({ id: parseInt(id) }, req.body);
    return res.status(200).json({
      message: "Post updated successfully",
    });

    // await user.save();
    // return res.status(200).json({
    //   message: "User updated",
    //   user,
    // });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    throw error;
  }
};
