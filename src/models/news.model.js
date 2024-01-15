const connection = require('../databases');
class News {
  static async getNews(type) {
    const query = type
      ? 'SELECT * from news WHERE type=?'
      : 'SELECT * from news';
    return new Promise((resolve, reject) => {
      connection.query(query, [type], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async getNewsById(newsId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM news WHERE news.id=?',
        [newsId],
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

  static createNews(title, movieId, videoKey, type, content, image, today) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO news(title,image, movie_id, video_key,type,content,created_at) VALUES(?,?,?,?,?,?,?)',
        [title, image, movieId, videoKey, type, content, today],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static update(id, title, movieId, videoKey, type, content, image) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE news SET title=?,image=?,movie_id=?,video_key=?,type=?,content=? WHERE id=?',
        [title, image, movieId, videoKey, type, content, id],
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

  static deleteNews(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM news  WHERE id=?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static async userLikeNews(userId, newsId) {
    const query = 'SELECT * FROM news_like WHERE user_id=? and news_id=?';
    return new Promise((resolve, reject) => {
      connection.query(query, [userId, newsId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async getLikeNews(newsId) {
    const query =
      'SELECT news_like.*,user.fullName FROM news_like JOIN user ON news_like.user_id=user.id WHERE news_like.news_id=?';
    return new Promise((resolve, reject) => {
      connection.query(query, [newsId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async likeNews(userId, newsId) {
    const query = 'INSERT INTO news_like(user_id,news_id) VALUES(?,?)';
    return new Promise((resolve, reject) => {
      connection.query(query, [userId, newsId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async unlikeNews(userId, newsId) {
    const query = 'DELETE FROM news_like WHERE user_id = ? AND news_id =?';
    return new Promise((resolve, reject) => {
      connection.query(query, [userId, newsId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async commentNews(userId, newsId, content, today) {
    const query =
      'INSERT INTO news_comment(user_id,news_id,content,created_at) VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [userId, newsId, content, today],
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

  static async getCommentNews(newsId) {
    const query =
      'SELECT news_comment.*,user.fullName,user.avatar FROM news_comment JOIN user ON news_comment.user_id=user.id WHERE news_comment.news_id=? ORDER BY news_comment.created_at DESC';
    return new Promise((resolve, reject) => {
      connection.query(query, [newsId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }
}
module.exports = News;
