export default class WheelConfig {
  constructor() {
    /**
     *
     * @description основные настройки canvas  ширина высота элемент
     */
    this.canvas = document.querySelector(".canvas");
    this.innerWidth = 500;
    this.innerHeight = 500;

    /**
     *
     * @description длительность в миллисекундах сколько будет крутиться колесо.
     *  Особенность чем дольше крутится тем больше замедляется
     */

    this.duration = 3000;

    /**
     *
     * @description   основные настройки значений и цвета, можно использовать любые значения,
     * значения которые будут отображены
     */

    this.sections = ["1", "2", "3", "4", "5", "6"];

    // цвета секторов
    this.colors = [
      "rgba(13, 31, 241, 1)",
      "rgba(13, 255, 203, 1)",
      "rgba(0, 255, 29, 1)",
      "rgba(241, 255, 0, 1)",
      "rgba(242, 6, 6, 1) ",
      "#FF00B1",
    ];

    /**
     *
     * @description   настройки текста находящегося в колесе
     */

    //
    this.font_size = 1.5; // размер текста
    this.font_weight = "bold"; // жирность текста
    this.font_family = "sans-serif"; // стиль текста
    this.font_align = "center"; // положение вдоль высоты
    this.font_baseline = "middle"; // положение вдоль ширины

    this.font_color = "#000000"; // цвет обычного текста
    this.font_shadow = "#000"; // цвет обычных теней текста

    this.font_color_selected = "#FFFFFF"; // цвет текста который находится на победном секторе
    this.font_shadow_selected = "#FFF"; // цвет тени которая находится на победном секторе

    /**
     * @description вспомогательные настройки
     */
    // контейнер для спрайтов
    this.wheels = [];

    //расчет радиуса для определения правильной точки для центрирования колеса
    this.radius = (Math.min(this.innerWidth, this.innerHeight) / 2.25) | 0;
  }
}
