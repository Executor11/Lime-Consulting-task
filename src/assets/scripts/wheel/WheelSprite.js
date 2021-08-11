import WheelConfig from "./WheelConfig.js";

export default class WheelSprite {
  constructor() {
    // конфиг с настройками и важной информацией для отрисовки
    this.config = new WheelConfig();
  }

  /**
   * @description render метод отрисовки для canvas
   * @param {number} angle принимает в качестве параметра угол в радианах
   */
  render(angle = 0) {
    if (!this.config.wheels.length) {
      // создаем новые элементы которые будут расчитываться от колличества sections[]
      for (
        let selected = 0;
        selected < this.config.sections.length;
        selected++
      ) {
        // создаем canvas для каждого элемента

        let newCanvas = document.createElement("canvas");
        newCanvas.width = newCanvas.height = 2 * this.config.radius + 10;

        let context = newCanvas.getContext("2d"),
          contextX = 5 + this.config.radius,
          contextY = 5 + this.config.radius;

        // градиент для более правдоподобного вида в виде теней
        let gradient = context.createRadialGradient(
          contextX,
          contextY,
          0,
          contextX,
          contextY,
          this.config.radius
        );
        // цвета основные для тени
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.1)");
        //
        for (let i = 0; i < this.config.sections.length; i++) {
          // начальная и конечная точка грубо говоря 1 радиан при 6 значениях
          let startPoint = (2 * Math.PI * i) / this.config.sections.length;
          let endPoint =
            startPoint +
            (2 * Math.PI) / (i == 0 ? 1 : this.config.sections.length);
          // расчитывает правильное местонахождение текста при вращении
          let textAlign =
            (2 * Math.PI * (i + 0.5)) / this.config.sections.length;

          // сами кусочки пирога
          context.beginPath();
          context.moveTo(contextX, contextY);
          context.arc(
            contextX,
            contextY,
            this.config.radius,
            startPoint,
            endPoint
          );

          // разделение цветов и окраска
          context.fillStyle = this.config.colors[i % this.config.colors.length];
          context.fill();
          context.fillStyle = gradient;
          context.fill();
          context.save();

          // проверка элемента на выбраного, ну и его подсветка в случае если он попадает в ту зону визуал
          if (i == selected) {
            context.fillStyle = "#FFF";
            context.shadowColor = "#FFF";
            context.shadowBlur = this.config.radius / 20;
          } else {
            context.fillStyle = "#AAA";
            context.shadowColor = "#000";
            context.shadowBlur = this.config.radius / 100;
          }

          // настройки текста

          // размер текста можно поиграться с font_size переменной в config

          context.font =
            "bold " +
            (this.config.radius / this.config.sections.length) *
              this.config.font_size +
            "px sans-serif";

          // расположение текста по вертикали от центра,  меняем center-left-rigth и тд
          context.textAlign = "center";
          context.textBaseline = "middle";

          // вращение вместе с элементом
          context.translate(contextX, contextY);
          context.rotate(textAlign);
          context.fillText(
            this.config.sections[i],
            this.config.radius * 0.62,
            0
          );

          context.restore();
        }

        this.config.wheels.push(newCanvas);
      }
    }

    // основная реализация метода свечения и отрисоки канваса
    // размеры
    this.config.canvas.width = this.config.innerWidth;
    this.config.canvas.height = this.config.innerHeight;
    let contextX = this.config.innerWidth / 2,
      contextY = this.config.innerHeight / 2;

    let imgContext = this.config.canvas.getContext("2d");
    let selected =
      Math.floor(
        ((-0.2 - angle) * this.config.sections.length) / (2 * Math.PI)
      ) % this.config.sections.length;
    if (selected < 0) selected += this.config.sections.length;
    imgContext.save();
    // два translate между rotate нужно для выравнивания колеса иначе оно будет вокруг своей оси крутиться
    // #1
    imgContext.translate(contextX, contextY);

    // главное вращение если убрать будет просто светлая часть на тексте крутиться
    imgContext.rotate(angle);
    // #2
    imgContext.translate(
      -this.config.wheels[selected].width / 2,
      -this.config.wheels[selected].height / 2
    );
    // отрисовка как изображение
    imgContext.drawImage(this.config.wheels[selected], 0, 0);
    imgContext.restore();
  }
}
