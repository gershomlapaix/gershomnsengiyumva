const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    // const doc = await Model.deleteMany()

    if (!doc) {
      return next(
        new AppError(`No Documente with id ${req.params.id} found`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ status: "success", data: { newDoc } });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { doc } });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);

    if (!query) {
      return next(new AppError(`No document with id ${req.params.id}`, 404));
    }

    res.json({ status: "success", data: { doc } });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const docs = await Model.find();

    if (docs.length === 0) {
      res.status(404).json({
        message: "No data found",
      });
    } else {
      res.status(200).json({
        status: "success",
        results: docs.length,
        data: { docs },
      });
    }
  });
