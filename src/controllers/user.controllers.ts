import { Request, Response } from "express";
import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name } = req.body;

    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    await user.save();
    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    throw error;
    return res.status(500).json({
      message: "Something goes wrong!",
    });
    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users retrieved",
      users,
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

export const updateUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { first_name, last_name }
    // find user by id
    const user = await User.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // user.first_name = first_name;
    // user.last_name = last_name;

    User.update({ id: parseInt(id) }, req.body);
    return res.status(200).json({
      message: "User updated",
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.delete({ id: parseInt(id) });
    if (userDeleted.affected === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(204).json({
      message: "User deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userFounded = await User.findOneBy({ id: parseInt(id) });
    if (!userFounded) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({ userFounded });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};
