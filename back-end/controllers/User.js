const { Users } = require("../models");
const {
  getRequestData,
  getSearchConditions,
  paginatedData,
} = require("../utils/helper");

const dataRelations = [
  {
    association: "userRole",
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        association: "roleAccess",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  },
];

const searchable = ["fullName", "userName", "jabatan", "email", "contact"];

const getRow = async (id) => {
  return await Users.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt", "password"],
    },
    include: dataRelations,
  });
};

// Get all data
exports.findAll = async (req, res) => {
  try {
    let conditions = getSearchConditions(req, searchable);
    const request = getRequestData(req, {
      orderBy: "fullName",
      orderDir: "ASC",
    });
    const data = await Users.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      distinct: true,
      where: conditions,
      include: dataRelations,
      order: [[request.orderby, request.orderdir]],
      limit: Number(request.limit),
      offset: Number(request.offset),
    });
    res.json(paginatedData(data, request.limit));
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Get single data
exports.findOne = async (req, res) => {
  try {
    const data = await getRow(req.params.id);
    res.json(data);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await Users.create(req.body);
    res.json({
      message: "User Created successfully",
      data: await getRow(data?.id),
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Users.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "User Updated successfully",
      data: await getRow(req.params.id),
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Users.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "User Deleted successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
