export function optionsFilter (text, allOptions) {
    console.log(text, allOptions)


    return allOptions.filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
    })
}