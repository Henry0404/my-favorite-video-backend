import { RequestHandler } from "express";
import Video from "./Video";

export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({ url: req.body.url });
  if (videoFound)
    return res.status(301).json({ message: "The url al ready exists" });

  const video = new Video(req.body);
  const saveVideo = await video.save();
  res.json(saveVideo);
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.json(videos);
  } catch (error) {
    res.json(error);
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findById(req.params.id);
  //console.log(req.params);
  if (!videoFound) return res.status(204).json();
  return res.json(videoFound);
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findByIdAndDelete(req.params.id);
  //console.log(req.params);
  if (!videoFound) return res.status(204).json();
  return res.json(videoFound);
};

export const updateVideo: RequestHandler = async (req, res) => {
  const videoUpdate = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!videoUpdate) return res.status(204).json();
  res.json(videoUpdate);
};
