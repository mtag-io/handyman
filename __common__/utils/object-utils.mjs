export const notEmpty = o => o && Object.keys(o).length
export const empty = o => !notEmpty(o)