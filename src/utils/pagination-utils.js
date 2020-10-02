export const assembleUrlPage = (forward, next, previous) => {
    let urlSplit
    switch (forward) {
        case 'next':
            urlSplit = next.split('?')
            return `?${urlSplit[1]}`
        case 'previous':
            urlSplit = previous.split('?')
            return `?${urlSplit[1]}`
        default: break;
    }
    return urlSplit
}