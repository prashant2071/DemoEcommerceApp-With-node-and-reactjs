// const { delete } = require('../../Route/api.route');
// const { delete } = require('../../Route/api.route');
const map_product_req = require("../../helpers/map_product_req");
const ProductQuery = require("./products.query");

function findAll(req, res, next) {
  var condition = {};
  if (req.user.role != 1) {
    condition.vendor = req.user._id;
  }
  ProductQuery.find(condition,  req.query)
    .then(function (done) {
      res.json(done);
    })
    .catch(function (err) {
      next(err);
    });
}
function insert(req, res, next) {
  if (req.fileTypeErr) {
    return next({
      msg: "Invalid file format",
      status: 404,
    });
  }
  const data = req.body;
  data.vendor = req.user._id;
  console.log("the file is ", req.files);

  if (req.files && req.files.length) {
    data.image = req.files.map(function (file) {
      return file.filename;
    });
  }

  ProductQuery.insert(data)
    .then(function (product) {
      res.json(product);
    })
    .catch(function (err) {
      next(err);
    });
}

function getById(req, res, next) {
  ProductQuery.getById(req.params.id)
    .then(function (product) {
      res.json(product);
    })
    .catch(function (err) {
      next(err);
    });
}
function update(req, res, next) {
  const data = req.body;
  data.user_id = req.user._id;
  console.log("req body data >>>", data);
  if (req.files && req.files.length) {
    data.newImages = req.files.map(function (file) {
      return file.filename;
    });
  }
  //note images are in string instead  so remove existing image from request
  delete data.image;

  console.log("new Images are", data.newImages);
  const filestoRemove = data.filestoRemove.split(",").map((img) => {
    return img.split("image/")[1];
  });
  data.filestoRemove = filestoRemove;
  console.log("Files to remove", filestoRemove);

  ProductQuery.update(req.params.id, data)
    .then(function (updated) {
      res.json(updated);
    })
    .catch(function (err) {
      next(err);
    });
}
function remove(req, res, next) {
  ProductQuery.remove(req.params.id)
    .then(function (removed) {
      res.json(removed);
    })
    .catch(function (err) {
      next(err);
    });
}
function addReview(req, res, next) {
  if (!(req.body.reviewMessage && req.body.reviewPoint)) {
    return next({
      msg: "missing required feild no review",
      status: 404,
    });
  }
  const productId = req.params.productId;
  const reviewData = {
    message: req.body.reviewMessage,
    point: req.body.reviewPoint,
    user: req.user._id,
  };
  console.log("the data is>>", reviewData);
  ProductQuery.addReview(productId, reviewData)
    .then(function (addreview) {
      res.json(addreview);
    })
    .catch(function (err) {
      next(err);
    });
}
function search(req, res, next) {
  console.log("data in req body >>>", req.body);
  const SearchCondition = {};
  if (req.body.category) {
    console.log("category is ", req.body.category);
    SearchCondition.category = req.body.category;
  }
  if (req.body.name) {
    console.log("name is ", req.body.name);
    SearchCondition.name = req.body.name;
  }

  if (req.body.brand) {
    console.log("brand is ", req.body.brand);
    SearchCondition.brand = req.body.brand;
  }
  if (req.body.color) {
    console.log("color is ", req.body.color);
    SearchCondition.color = req.body.color;
  }
  if (req.body.minPrice && req.body.maxPrice) {
    console.log("multiple price range is ");
    SearchCondition.price = {
      $gte: req.body.minPrice,
      $lte: req.body.maxPrice,
    };
  }
  if (req.body.minPrice) {
    console.log("minPrice is ", req.body.minPrice);
    SearchCondition.price = { $gte: req.body.minPrice };
  }
  if (req.body.maxPrice) {
    console.log("maxPrice is ", req.body.maxPrice);
    SearchCondition.price = { $lte: req.body.maxPrice };
  }
  if (req.body._id) {
    SearchCondition._id = req.body._id;
  }

  if (req.body.fromDate && req.body.toDate) {
    console.log("fromDate is ", req.body.fromDate);
    console.log("toDate is ", req.body.toDate);

    const fromDate = new Date(req.body.fromDate).setHours(0, 0, 0, 0);
    const toDate = new Date(req.body.toDate).setHours(23, 59, 59, 999);

    SearchCondition.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }
  if (req.body.fromDate) {
    console.log("fromDate is ", req.body.fromDate);
    const fromDate = new Date(req.body.fromDate).setHours(0, 0, 0, 0);
    SearchCondition.createdAt = {
      $gte: new Date(fromDate),
    };
  }

  //   $in it will give result if anuy item matcu
  //   $all it apply all the condition that is applied

  if (req.body.tags) {
    let tags =
      typeof req.body.tags === "string"
        ? req.body.tags.split(",")
        : req.body.tags;

    SearchCondition.tags = {
      $in: req.body.tags,
    };
  }

  ProductQuery.find(SearchCondition)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      next(err);
    });
}

module.exports = {
  findAll,
  getById,
  insert,
  update,
  remove,
  search,
  addReview,
};
