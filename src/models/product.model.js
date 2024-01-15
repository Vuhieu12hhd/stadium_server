const connection = require('../databases');
class Product {
  static async getProducts() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * from product',
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static async getProductById(productId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE product.id=?',
        [productId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static createProduct(name, price,image) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO product(name,price,image) VALUES(?,?,?)',
        [name, price,image],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static update(id, name,price,image) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET name=?,price=?,image=? WHERE id=?',
        [name,price,image, id],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      );
    });
  }

  static deleteProduct(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM product  WHERE id=?',
        [id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }


  static async findProductByName(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT name FROM product WHERE name=? ',
        [name],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }
}
module.exports = Product;
