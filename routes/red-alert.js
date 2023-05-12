var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, response, next) {
  const axios = require('axios');
  const url = 'https://www.oref.org.il/WarningMessages/alert/alerts.json';
  let prevId = '';

  axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://www.oref.org.il/12481-he/Pakar.aspx',
      },
      maxContentLength: Infinity,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data !== '' && res.data.constructor === Object) {
        let json = JSON.parse(JSON.stringify(res.data));

        if (json.id != prevId) {
          prevId = json.id;

          let locations = '';

          for (let i = 0; i < json.data.length; i++) {
            if (i == json.data.length - 1) {
              locations += json.data[i] + '.      ';
            } else {
              locations += json.data[i] + '.';
            }
          }
          return response.json({ 'red-alert': locations });
        }
      }
      return response.json({ 'red-alert': '' });
    })
    .catch((err) => {
      console.log(err);
      return response.json({ 'red-alert': '' });
    });
});

module.exports = router;
