const fs = require('fs');
const superagent = require('superagent');
const cheerio = require('cheerio');

const targetUrl = 'https://www.guokr.com';

superagent.get(targetUrl).end(function (err, res) {
  if (err) {
    console.log(err.stack);
  }

  let data = [];
  let $ = cheerio.load(res.text);

  $('.recos-article ul li').each(function(i, elem) {
    let item = $(elem).find('a');
    data.push({
      href: item.attr('href'),
      title: item.text()
    });
  });

  fs.writeFile('guokr.json', JSON.stringify(data), function(err) {
    if (err) {
      console.log(err.stack);
    }
    console.log('success');
  });
});
