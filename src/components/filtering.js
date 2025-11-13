export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === "clear") {
            const parent = action.closest("[data-field]");
            if (parent) {
                const input = parent.querySelector("input, select");
                const fieldName = action.dataset.field;

                if (input) input.value = "";
                if (fieldName && state[fieldName] !== undefined) {
                    state[fieldName] = "";
                }
            }
        }

        // @todo: #4.5 — сформировать параметры фильтрации для сервера
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    // Формируем параметры фильтра для сервера
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    }
}