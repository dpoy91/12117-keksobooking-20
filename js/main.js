'use strict';

// Конфиг

var configApp = {
  MAX_ADS_NUMBERS: 8,
  PINS: document.querySelector('.map__pins'),
  MAP: document.querySelector('.map'),
};

var apartmentInformation = {
  TYPE: ['palace', 'flat', 'house', 'bungalo'],
  CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

// Получаем координаты по X

var getLocationX = function () {
  var locationPositionX = Math.random() * configApp.PINS.offsetWidth;

  return locationPositionX;
};

// Получаем координаты по Y

var getLocationY = function () {
  var locationPositionY = 130 + Math.random() * 500;

  return locationPositionY;
};

// Вычисляем случайное значение от max до min

var getRandomValue = function (max, min) {
  if (!min) {
    min = 0;
  }

  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

// Генерируем данные и заполняем массив

var getAdObject = function () {
  var ads = [];

  for (var i = 1; i <= configApp.MAX_ADS_NUMBERS; i++) {
    var location = {
      x: getLocationX(),
      y: getLocationY(),
    };

    var ad = {
      avatar: 'img/avatars/user0' + i + '.png',
      title: 'Заголовок предложения',
      address: location.x + ', ' + location.y,
      price: 500,
      type: apartmentInformation.TYPE[getRandomValue(apartmentInformation.TYPE.length - 1)],
      rooms: Math.round(Math.random() * 10) + 1,
      guests: Math.round(Math.random() * 10) + 1,
      checkin: apartmentInformation.CHECKIN_TIMES[getRandomValue(apartmentInformation.CHECKIN_TIMES.length - 1)],
      checkout: apartmentInformation.CHECKIN_TIMES[getRandomValue(apartmentInformation.CHECKIN_TIMES.length - 1)],
      features: apartmentInformation.FEATURES[getRandomValue(apartmentInformation.FEATURES.length - 1)],
      description: 'Описание',
      photos: apartmentInformation.PHOTOS[getRandomValue(apartmentInformation.PHOTOS.length - 1)],
      location: location,
    };

    ads.push(ad);

  } return ads;
};

// Убираем класс ".map--faded" у блока "map"

configApp.MAP.classList.remove('map--faded');

// Показываем обьявления на карте

var renderAds = function () {
  var ads = getAdObject();
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  var pinWidth = 50;
  var pinHeight = 70;

  for (var i = 0; i < configApp.MAX_ADS_NUMBERS; i++) {
    var newAdd = template.cloneNode(true);
    var btn = newAdd.querySelector('.map__pin');
    var img = newAdd.querySelector('img');

    btn.style.top = ads[i].location.y - pinHeight + 'px';
    btn.style.left = ads[i].location.x - pinWidth / 2 + 'px';
    img.src = ads[i].avatar;
    img.alt = ads[i].title;
    fragment.appendChild(newAdd);
  }

  configApp.PINS.appendChild(fragment);
};

renderAds();

