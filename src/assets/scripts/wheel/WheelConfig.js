export default class WheelConfig {
  constructor() {
    //основные настройки canvas  ширина высота элемент
    this.canvas = document.querySelector(".canvas");
    this.innerWidth = 500;
    this.innerHeight = 500;

    // длительность в миллисекундах сколько будет крутиться колесо, особенность чем дольше крутится тем больше замедляется
    this.duration = 3000;

    // основные настройки значений и цвета, можно использовать любые значения,
    // желательно не очень длинные иначе придется редактировать размер текста, хотя
    this.sections = ["1", "2", "3", "4", "5", "6"];
    this.colors = [
      "rgba(13, 31, 241, 1)",
      "rgba(13, 255, 203, 1)",
      "rgba(0, 255, 29, 1)",
      "rgba(241, 255, 0, 1)",
      "rgba(242, 6, 6, 1) ",
      "#FF00B1",
    ];
    this.font_size = 1.5;

    // контейнер для спрайтов
    this.wheels = [];

    //расчет радиуса для определения правильной точки для центрирования колеса
    this.radius = (Math.min(this.innerWidth, this.innerHeight) / 2.25) | 0;
  }
}
