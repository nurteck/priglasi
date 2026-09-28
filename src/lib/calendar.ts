export const monthNames = {
  ky: [
    "Үчтүн айы", "Бирдин айы", "Жалган Куран", "Чын Куран", "Бугу", "Кулжа",
    "Теке", "Баш Оона", "Аяк Оона", "Тогуздун айы", "Жетинин айы", "Бештин айы",
  ],
  ru: [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ],
} as const;

export const weekdayNames = {
  ky: ["Дүй", "Шей", "Шар", "Бей", "Жума", "Ишм", "Жек"],
  ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
} as const;

export const weekdayFullNames = {
  ky: ["Дүйшөмбү", "Шейшемби", "Шаршемби", "Бейшемби", "Жума", "Ишемби", "Жекшемби"],
  ru: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
} as const;

/** Понедельник = 0 ... воскресенье = 6 */
function mondayIndex(jsDay: number): number {
  return (jsDay + 6) % 7;
}

export interface MonthGridDay {
  date: number;
  isCurrentMonth: boolean;
  isTarget: boolean;
}

/** Строит сетку недель для месяца, в котором находится targetDate. */
export function buildMonthGrid(targetDate: Date): MonthGridDay[][] {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = mondayIndex(firstOfMonth.getDay());

  const cells: MonthGridDay[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: 0, isCurrentMonth: false, isTarget: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, isCurrentMonth: true, isTarget: d === targetDate.getDate() });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: 0, isCurrentMonth: false, isTarget: false });
  }

  const weeks: MonthGridDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
