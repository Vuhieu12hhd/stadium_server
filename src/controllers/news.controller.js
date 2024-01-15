const connection = require('../databases');
const News = require('../models/news.model');
const moment = require('moment');

exports.getNews = async (req, res) => {
  try {
    const { type } = req.query;
    const news = await News.getNews(type);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getNewsById = async (req, res) => {
  const { newsId } = req.params;
  try {
    const news = await News.getNewsById(newsId);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNews = async (req, res) => {
  const { title, movieId, videoKey, type, content, image } = req.body;
  const today = moment(new Date()).format('YYYY-MM-DD HH:mm');
  try {
    const results = await News.createNews(
      title,
      movieId,
      videoKey,
      type,
      content,
      image,
      today
    );
    res.json({
      success: true,
      data: {
        message: 'Thêm tin tức thành công',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id, title, movieId, videoKey, type, content, image } = req.body;
    const results = await News.update(
      id,
      title,
      movieId,
      videoKey,
      type,
      content,
      image
    );
    res.json({
      success: true,
      data: {
        message: 'Cập nhật tin tức thành công',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.body;
    const results = await News.deleteNews(id);
    res.json({
      success: true,
      data: {
        message: 'Xóa tin tức thành công',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLikeNews = async (req, res) => {
  try {
    const { userId } = req;
    const { newsId } = req.params;
    const results = await News.getLikeNews(newsId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likeNews = async (req, res) => {
  try {
    const { userId } = req;
    const { newsId } = req.params;
    const userLike = await News.userLikeNews(userId, newsId);
    let news_like;
    if (userLike.length > 0) {
      news_like = await News.unlikeNews(userId, newsId);
    } else {
      news_like = await News.likeNews(userId, newsId);
    }
    res.json(news_like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.commentNews = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const today = moment(new Date()).format('YYYY-MM-DD HH:mm');
    const { userId } = req;
    const { newsId } = req.params;
    const { content } = req.body;
    const results = await News.commentNews(userId, newsId, content, today);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommentNews = async (req, res) => {
  try {
    const { userId } = req;
    const { newsId } = req.params;
    const results = await News.getCommentNews(newsId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
