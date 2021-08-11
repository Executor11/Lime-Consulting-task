// подключение модулей
import Wheel from "./wheel/Wheel.js";
import WheelConfig from "./wheel/WheelConfig.js";
import WheelSprite from "./wheel/WheelSprite.js";

const wheel = new Wheel();
const config = new WheelConfig();
const sprite = new WheelSprite();

window.onload = () => {
  // при загрузке страницы рисуется и колесо!!!
  sprite.render();
  // переменные
  const spinBtn = document.querySelector(".button__spin");
  const respinBtn = document.querySelector(".button__respin");

  const popup = document.querySelector(".popup");
  const popupCloseBtn = document.querySelector(".popup__header_close");
  const backdrop = document.querySelector(".popup__backdrop");

  const winField = document.querySelector(".wheel-win-number");

  // func

  // открытие модального окна и присваивание значения
  const showPopup = win => {
    setTimeout(() => {
      popup.classList.remove("popup__hidden");
      backdrop.classList.remove("popup__hidden");

      winField.textContent = config.sections[win];
    }, config.duration);
  };
  // закрытие модального окна
  const hidePopup = () => {
    popup.classList.add("popup__hidden");
    backdrop.classList.add("popup__hidden");
  };

  // начало прокрутки колеса
  const startWheel = () => {
    if (!wheel.running) {
      const winPosition = (Math.random() * config.sections.length) | 0;

      wheel.start(winPosition, config.duration);

      showPopup(winPosition);
    }
  };

  // основная кнопка прокрутки
  spinBtn.addEventListener("click", startWheel);

  // кнопка модального окна
  respinBtn.addEventListener("click", () => {
    hidePopup();
    startWheel();
  });
  // закрытие модального окна
  popupCloseBtn.addEventListener("click", hidePopup);
};
