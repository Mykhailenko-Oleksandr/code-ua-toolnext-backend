import { Session } from "../models/session";

export const registerUser = async (req, res) => {
  res.status(201).json();
};

export const loginUser = async (req, res) => {
  res.status(200).json();
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookies('sessionId');
  res.clearCookies('accessToken');
  res.clearCookies('refreshToken');
  
  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  res.status(200).json();
};
