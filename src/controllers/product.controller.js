const connection = require('../databases');
const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.getProductById(productId);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price,image } = req.body;
  try {
    const ProductResult = await Product.findProductByName(name);
    if (ProductResult.length > 0) {
      res.json({
        success: false,
        data: {
          message: 'Tên sản phẩm không được trùng nhau',
        },
      });
      return;
    }
    const results = await Product.createProduct(name, price,image);
    res.json({
      success: true,
      data: {
        message: 'Thêm sản phẩm thành công',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, name,price,image } = req.body;
    const ProductResult = await Product.findProductByName(name);
    if (ProductResult.length > 0) {
      res.json({
        success: false,
        data: {
          message: 'Tên sản phẩm không được trùng nhau',
        },
      });
      return;
    }

    const results = await Product.update(id, name,price,image);
    res.json({
      success: true,
      data: {
        message: 'Cập nhật sản phẩm thành công',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const results = await Product.deleteProduct(id);
    res.json({
      success: true,
      data: {
        message: 'Xóa sản phẩm thành công',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

