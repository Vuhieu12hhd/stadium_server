const connection = require('../databases');
class Schedule {
  static async getSchedule(cinemaId, day, movieId) {
    return new Promise((resolve, reject) => {
      let query =
        'SELECT schedule.id,schedule.premiere,room.name as room,cinema.name as cinema,city.name as city,movie.name as movie FROM schedule JOIN room on schedule.room_id=room.id JOIN movie on schedule.movie_id=movie.id JOIN cinema on room.cinema_id=cinema.id JOIN city on cinema.city_id =city.id ORDER BY schedule.premiere DESC';
      if (cinemaId && day && movieId) {
        query =
          'SELECT schedule.*,room.name as room_name FROM schedule JOIN room ON room.id=schedule.room_id WHERE schedule.movie_id=? AND room.cinema_id=? AND DATE(schedule.premiere)=? ORDER BY schedule.premiere DESC';
      }
      let params = [];
      if (cinemaId && day && movieId) {
        params = [movieId, cinemaId, day];
      }
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async getSchedulesOfMovieByDate(day, movieId) {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT schedule.*, room.name as roomName, cinema.name as cinemaName FROM movie_system.schedule JOIN room on room.id=schedule.room_id JOIN cinema on cinema.id=room.cinema_id WHERE schedule.movie_id=? AND DATE(schedule.premiere)=? ORDER BY schedule.premiere ASC';
      const params = [movieId, day];
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  static async getScheduleById(scheduleId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT schedule.*,room.name as roomName,room.cinema_id,cinema.name  as cinemaName FROM schedule JOIN room ON room.id=schedule.room_id JOIn cinema ON room.cinema_id=cinema.id WHERE schedule.id=?',
        [scheduleId],
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

  static async getAllChairs() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM chair', (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }
  static async getAmount(date_type, time_type, format_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT amount,amount_vip FROM amount WHERE dayOfWeek=? AND timeOfDay=? AND format_id =?',
        [date_type, time_type, format_id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async getReport(movieId, fromDate, toDate) {
    return new Promise((resolve, reject) => {
      const query = movieId
        ? 'SELECT SUM(value) as value,created_date FROM ticket JOIN schedule ON schedule.id=ticket.schedule_id WHERE movie_id=? AND created_date BETWEEN ? AND ? GROUP BY created_date ORDER BY created_date'
        : 'SELECT SUM(value) as value,created_date FROM ticket WHERE created_date BETWEEN ? AND ? GROUP BY created_date ORDER BY created_date';
      const params = movieId ? [movieId, fromDate, toDate] : [fromDate, toDate];
      connection.query(query, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static async bookingChairs(
    userId,
    scheduleId,
    totalMoney,
    today,
    selectedChairs,
    productList
  ) {
    console.log(
      userId,
      scheduleId,
      totalMoney,
      today,
      selectedChairs,
      productList
    );
    const products = productList || [];
    return new Promise((resolve, reject) => {
      connection.query(
        'SET @random_characters = SUBSTR(MD5(RAND()), 1, 8);',
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          connection.query(
            'INSERT INTO ticket(user_id,schedule_id,value,created_date,code) VALUES(?,?,?,?, @random_characters)',
            [userId, scheduleId, totalMoney, today],
            (err, resultTicket) => {
              if (err) {
                reject(err);
                return;
              }
              const ticketId = resultTicket.insertId;
              const newTicketDetail = selectedChairs.map(s => [ticketId, s]);
              const productTicket = products?.map(product => [
                ticketId,
                product.id,
                product.quantity,
              ]);

              connection.query(
                'INSERT INTO ticket_detail(ticket_id,chair_id) VALUES ?',
                [newTicketDetail],
                (err, results) => {
                  if (err) {
                    reject(err);
                    return;
                  }

                  resolve(resultTicket);
                }
              );
              if (productTicket?.length > 0) {
                connection.query(
                  'INSERT INTO ticket_product(ticket_id,product_id,quantity) VALUES ?',
                  [productTicket],
                  (err, results) => {
                    if (err) {
                      reject(err);
                      return;
                    }
                    resolve(results);
                  }
                );
              }
            }
          );
        }
      );
    });
  }

  static async getTicketByCode(code) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.fullName,ticket.id,ticket.value,ticket.created_date,ticket.code,ticket.status,ticket_detail.chair_id,chair.xPosition,cinema.name as cinema, chair.yPosition,schedule.premiere,room.name as room,movie.name as movie,movie.time as movie_time FROM ticket JOIN ticket_detail ON ticket_detail.ticket_id=ticket.id JOIN schedule ON schedule.id=ticket.schedule_id JOIN room ON room.id=schedule.room_id JOIN movie ON movie.id=schedule.movie_id JOIN chair ON chair.id=ticket_detail.chair_id JOIN cinema ON cinema.id=room.cinema_id JOIN user ON user.id=ticket.user_id WHERE ticket.code=?',
        [code],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async receiveTicket(code) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE ticket SET status=1 WHERE code=?',
        [code],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async cancelTicket(code) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE ticket SET is_cancel=1 WHERE code=?',
        [code],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async getChairsByScheduleId(scheduleId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT ticket_detail.* FROM ticket_detail JOIN ticket ON ticket.id=ticket_detail.ticket_id WHERE ticket.schedule_id=? AND ticket.is_cancel=0',
        [scheduleId],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async getTimeTypeSchedule(scheduleId) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT schedule.*,movie.format_id, CASE WHEN EXISTS (SELECT 1 FROM holiday WHERE holiday.day = date(schedule.premiere)) THEN 3 WHEN DAYOFWEEK(schedule.premiere) BETWEEN 2 AND 6 THEN 1 ELSE 2 END AS date_type, IF(HOUR(schedule.premiere) < 18, 1, 2) AS time_type FROM schedule JOIN movie ON movie.id=schedule.movie_id where schedule.id=?',
        [scheduleId],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async createSchedule(roomId, movieId, premiere) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO schedule(room_id,movie_id,premiere) VALUES (?,?,?)',
        [roomId, movieId, premiere],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async updateSchedule(roomId, movieId, premiere, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE schedule SET room_id=?,movie_id=?,premiere=? WHERE id=?',
        [roomId, movieId, premiere, id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static async deleteSchedule(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM schedule WHERE id =?',
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

  static async getTicketDetailById(id) {
    const promise = new Promise((resolve, reject) => {
      connection.query(
        'SELECT ticket.id,ticket.value,ticket.created_date,ticket.code,ticket.status,ticket.is_cancel,ticket_detail.chair_id,chair.xPosition,cinema.name as cinema, chair.yPosition,schedule.premiere,room.name as room,movie.name as movie,product.name as product_name,ticket_product.quantity as product_quantity,product.id as product_id FROM ticket JOIN ticket_detail ON ticket_detail.ticket_id=ticket.id JOIN schedule ON schedule.id=ticket.schedule_id JOIN room ON room.id=schedule.room_id JOIN movie ON movie.id=schedule.movie_id JOIN chair ON chair.id=ticket_detail.chair_id JOIN cinema ON cinema.id=room.cinema_id LEFT JOIN ticket_product ON ticket_product.ticket_id=ticket.id LEFT JOIN product on ticket_product.product_id=product.id WHERE ticket.id=?',
        [id],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      );
    });

    const result = await promise;
    const response = [];
    const ticketId = [];
    result.forEach(ticket => {
      if (!ticketId.includes(ticket.id)) {
        ticketId.push(ticket.id);
      }
    });
    for (let i = 0; i < ticketId.length; i++) {
      const allTicketDetail = result.filter(r => r.id === ticketId[i]);
      let ticketIndex = { ...allTicketDetail[0] };
      const allChairs = allTicketDetail.map(
        ticket => `${ticket.xPosition}${ticket.yPosition}`
      );
      ticketIndex.chairs = [...new Set(allChairs)];
      const products = [];
      allTicketDetail.forEach(ticketDetail => {
        if (
          !products.find(product => product.id === ticketDetail.product_id) &&
          ticketDetail.product_id
        ) {
          products.push({
            id: ticketDetail.product_id,
            name: ticketDetail.product_name,
            quantity: ticketDetail.product_quantity,
          });
        }
      });
      ticketIndex.products = products;
      response.push(ticketIndex);
    }
    response.sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    return response;
  }
}

module.exports = Schedule;
