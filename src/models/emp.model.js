const connection = require('../databases');
class Emp {
  static async getEmps() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE role="EMP"',
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

  static async create(fullName, address, email, password) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO user(fullName,address,email,password,role,isVerify) VALUES(?,?,?,?,"EMP","1")',
        [fullName, address, email, password],
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

  static async getEmpById(empId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT fullName,address,email,password from user WHERE id=?',
        [empId],
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

  static async findEmpByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT email from user WHERE email=?',
        [email],
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

  static async update(fullName, address, email, password, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET fullName=?,address=?,email=?,password=? WHERE id=?',
        [fullName, address, email, password, id],
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

  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE id=?', [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }
}

module.exports = Emp;
