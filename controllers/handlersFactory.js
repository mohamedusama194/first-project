import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new ApiError(`no document with this id ${id}`, 404));
    }
    await document.deleteOne();
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
    document.save();
    res.status(200).json({ data: document });
  });
export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });
export const getOne = (Model, populateOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populateOpt) {
      query = query.populate(populateOpt);
    }
    const Document = await query;
    if (!Document) {
      // res.status(404).json({ msg: `no Document with this id ${id}` });
      return next(new ApiError(`no Document with this id ${id}`, 404));
    }
    res.status(200).json({ data: Document });
  });
export const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .keywordSearch("product")
      .limitFields()
      .sort()
      .paginate(documentCount);
    const { mongooseQuery, paginationResult } = apiFeatures;
    const douments = await mongooseQuery;
    res
      .status(200)
      .json({ result: douments.length, paginationResult, data: douments });
  });
