const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
router.get('/', newsController.getNews);
router.get('/:newsId/like', newsController.getLikeNews);
router.post('/:newsId/like', newsController.likeNews);
router.get('/:newsId/comment', newsController.getCommentNews);
router.post('/:newsId/comment', newsController.commentNews);
router.get('/:newsId', newsController.getNewsById);
router.post('/', newsController.createNews);
router.put('/', newsController.updateNews);
router.delete('/', newsController.deleteNews);

module.exports = router;
