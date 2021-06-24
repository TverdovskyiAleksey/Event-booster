export const eventSettings = event => ({
  id: event.id,
  image: {
    small: event.images.find(img => {
      return img.height === 360 && img.width === 640;
    }).url,
    big: event.images.find(img => {
      return img.height === 639 && img.width === 1136;
    }).url,
  },
  name: event.name,
  pleaseNote: event.pleaseNote,
  date: event.dates.start.localDate,
  time: event.dates.start.localTime,
  timezone: event._embedded.venues[0].timezone,
  place: event._embedded.venues[0].name,
  // place2: event._embedded.venues[0].address.line1,
  // place2: event._embedded.venues[0].location,
  city: event._embedded.venues[0].city.name,
  country: event._embedded.venues[0].country.name,
  prices: event.priceRanges,
  url: event.url,
});
