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
            console.log("Clear button clicked", action);
            const parent = action.closest(".filter-wrapper");
            console.log("Parent filter wrapper:", parent);
            
            if (parent) { 
                const input = parent.querySelector("input");
                console.log("Found input element:", input);
                
                const fieldName = action.dataset.field; 
                console.log("Field name:", fieldName);

                if (input) {
                    input.value = ""; 
                    console.log("Input value cleared");
                    
                    if (fieldName && state[fieldName] !== undefined) { 
                        state[fieldName] = ""; 
                        console.log("State cleared for field:", fieldName);
                    }
                } else {
                    console.log("Input element not found in filter wrapper");
                }
            } else {
                console.log("Filter wrapper not found");
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