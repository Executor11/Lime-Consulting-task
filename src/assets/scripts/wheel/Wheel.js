import WheelConfig from "./WheelConfig.js";
import WheelSprite from "./WheelSprite.js";

/**
 * @description class для управления колесом фортуны
 *
 * включает методы: start(winner: number, duration: number)
 */
export default class Wheel {
  constructor() {
    this.config = new WheelConfig();
    this.sprite = new WheelSprite();

    this.angle = 0;
    this.running = false;
    // this.sprite.render(this.angle);
  }

  //  функция которая определяет вращение
  /**
   * @description функция для начала вращения колеса фортуны
   * @param {number} winner определяет победителя и крутится до этого значения
   * @param {number} duration определяет скорость и длительность вращения
   */
  start(winner, duration) {
    // расчет выигрышной позиции
    let final_angle =
      -0.3 - ((0.5 + winner) * 2 * Math.PI) / this.config.sections.length;
    let start_angle =
      this.angle -
      Math.floor(this.angle / (2 * Math.PI)) * 2 * Math.PI -
      5 * 2 * Math.PI;

    //
    let start = performance.now();

    // update view обновление кадров
    //animation анимация вращения
    const update = () => {
      let now = performance.now();

      //transition плавность вращения
      let t = Math.min(1, (now - start) / duration);
      // обеспечивает вращение тип transition: ease-in-out
      t = 3 * t * t - 2 * t * t * t;
      this.angle = start_angle + t * (final_angle - start_angle);

      // отрисовка спрайта во время вращения
      this.sprite.render(this.angle);

      if (t < 1) requestAnimationFrame(update);
      else this.running = false;
    };
    // рекурсивное вращение
    requestAnimationFrame(update);
    this.running = true;
  }
}
