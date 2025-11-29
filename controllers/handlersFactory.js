import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`no document with this id ${id}`, 404));
    }
    res.status(204).json();
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //this syntax to return document after update
    );
    if (!document) {
      return next(
        new ApiError(`no document with this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });
export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Document = await Model.findById(id);
    if (!Document) {
      // res.status(404).json({ msg: `no Document with this id ${id}` });
      return next(new ApiError(`no Document with this id ${id}`, 404));
    }
    res.status(200).json({ data: Document });
  });
export const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documentCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .limitFields()
      .keywordSearch()
      .sort()
      .paginate(documentCount);
    const { mongooseQuery, paginationResult } = apiFeatures;
    const douments = await mongooseQuery;

    res
      .status(200)
      .json({ result: douments.length, paginationResult, data: douments });
  });
