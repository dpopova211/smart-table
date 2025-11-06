import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === "clear") {
            // Находим input, связанный с кнопкой очистки
            const parent = action.closest("[data-field]");
            if (parent) {
                const input = parent.querySelector("input, select");
                const fieldName = action.dataset.field;

                if (input) input.value = "";
                if (fieldName && state[fieldName] !== undefined) {
                    state[fieldName] = ""; // сбрасываем значение и в state
                }
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}