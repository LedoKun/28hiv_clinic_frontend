export function optionsFilter (text, allOptions) {
    return allOptions.filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
    })
}