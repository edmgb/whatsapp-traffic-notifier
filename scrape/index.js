const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// sorry, data protection issue
// contact me, for demo
const TRAFFIC_INCIDENT_SCRAPE_URL = '===' // replace!
const INCIDENT_SELECTOR = '===' // replace!

axios.get(TRAFFIC_INCIDENT_SCRAPE_URL).then(({ data }) => {
  const $ = cheerio.load(data)
  const traffic = $(INCIDENT_SELECTOR)
    .map((_, product) => {
      const $product = $(product)
      return $product.text()
    })
    .toArray()

  const trafficMessages = {
    traffic
  };

  const jsonData = JSON.stringify(trafficMessages)
  fs.writeFileSync('../traffic-data/traffic.json', jsonData)
});
