const connection = require('../databases');
class Movie {
  static async getMovies() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT m.id,m.name,m.description,m.director,m.image,m.view,m.ageLimit,m.timeRelease,m.time,l.name as language, f.name as format FROM movie m JOIN language l on m.language_id=l.id JOIN format f on f.id=m.format_id',
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
  static async getCategoriesByMovieId(movieId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT c.id,c.name FROM movie_category m  JOIN category c on c.id=m.category_id  WHERE movie_id=?',
        [movieId],
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
  static async getMovieById(movieId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT movie.*,language.name as language,format.name as format,country.name as country FROM movie JOIN language ON movie.language_id=language.id JOIN format on format.id=movie.format_id JOIN country ON country.id=movie.country_id WHERE movie.id=?',
        [movieId],
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
  static async getCategories() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category', (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
  static async getLanguages() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM language', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async getFormats() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM format', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  static async getCountries() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM country', (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  }
  static async create(
    name,
    director,
    description,
    image,
    countryId,
    languageId,
    view,
    ageLimit,
    timeRelease,
    time,
    formatId,
    categoryId,
    primaryThumbnail
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO movie(name,director,description,image,country_id,language_id,view,ageLimit,timeRelease,time,format_id,primaryThumbnail) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          name,
          director,
          description,
          image,
          countryId,
          languageId,
          view || 0,
          ageLimit,
          timeRelease,
          time,
          formatId,
          primaryThumbnail,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          connection.query(
            'INSERT INTO movie_category(movie_id,category_id) VALUES(?,?)',
            [results.insertId, categoryId],
            (err, results) => {
              if (err) {
                return reject(err);
              }
              resolve(results);
            }
          );
        }
      );
    });
  }
  static async update(
    id,
    name,
    director,
    description,
    image,
    countryId,
    languageId,
    view,
    ageLimit,
    timeRelease,
    time,
    formatId,
    categoryId
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE movie SET name=?,director=?,description=?,image=?,country_id=?,language_id=?,view=?,ageLimit=?,timeRelease=?,time=?,format_id=? WHERE id=?',
        [
          name,
          director,
          description,
          image,
          countryId,
          languageId,
          view,
          ageLimit,
          timeRelease,
          time,
          formatId,
          id,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          connection.query(
            'UPDATE movie_category SET category_id=? WHERE movie_id=?',
            [categoryId, id],
            (err, results) => {
              if (err) {
                return reject(err);
              }

              resolve(results);
            }
          );
        }
      );
    });
  }
  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM movie_category WHERE movie_id=?',
        [id],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          connection.query(
            'DELETE FROM movie WHERE id=?',
            [id],
            (err, results) => {
              if (err) {
                return reject(err);
              }

              resolve(results);
            }
          );
        }
      );
    });
  }
}

module.exports = Movie;
