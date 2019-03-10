import axios from 'axios';

const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json`;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class GeolocationService {
  getCityPosition(city) {
    const url = `${BASE_URL}?address=${city}&key=${API_KEY}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      axios
        .post(url)
        .then(response => {
          if (response && response.status === 200) {
            const { lat, lng } = response.data.result[0].geometry.location;

            resolve({ lat, lng });
          } else {
            reject('Ошибка. Неудается получить данные.');
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}

export { GeolocationService };
