const Movie = require('../models/movie.model');
const connection = require('../databases');
exports.getMovies = async (req, res, next) => {
  try {
    const results = await Movie.getMovies();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCategoriesByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const results = await Movie.getCategoriesByMovieId(movieId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMovieById = async (req, res) => {
  const { movieId } = req.params;
  try {
    const results = await Movie.getMovieById(movieId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCategories = async (req, res) => {
  try {
    const categories = await Movie.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Movie.getLanguages();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getFormats = async (req, res) => {
  try {
    const formats = await Movie.getFormats();
    res.json(formats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCountries = async (req, res) => {
  try {
    const countries = await Movie.getCountries();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  const {
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
    primaryThumbnail,
  } = req.body;
  try {
    const results = await Movie.create(
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
    );
    res.json({
      success: true,
      data: {
        message: 'Thêm mới phim thành công',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const {
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
      categoryId,
    } = req.body;

    const results = await Movie.update(
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
    );

    res.json({
      success: true,
      data: {
        message: 'Cập nhật phim thành công',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const results = await Movie.delete(id);

    res.json({
      success: true,
      data: {
        message: 'Xóa phim thành công',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
