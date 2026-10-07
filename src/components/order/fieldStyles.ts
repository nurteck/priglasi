/** Общий стиль полей формы заказа — единые высота/радиус/фокус на всех трёх шагах. */
export const fieldClass =
  "block w-full rounded-[14px] border bg-[#FFFCF7] px-4 text-base h-[54px] sm:h-14 text-[#2A0C12] " +
  "placeholder:text-[#9A8580] outline-none transition-[border-color,box-shadow] " +
  "focus:border-[#C79A5B] focus:ring-4 focus:ring-[rgba(216,178,122,.22)]";

export const fieldBorder = { borderColor: "rgba(90,24,38,.18)" };
export const fieldBorderError = { borderColor: "#5A1826" };

export const labelClass = "block text-sm font-semibold mb-1.5";
export const labelStyle = { color: "#2A0C12" };

export const errorClass = "mt-1 text-[13px]";
export const errorStyle = { color: "#5A1826" };
