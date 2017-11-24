/* eslint-disable no-mixed-operators */
export default (obj, requiredKeys) => Object.entries(requiredKeys).every(([key, values]) => {
    const value = obj[key]
    
    // FYI: typeof [] === 'object' #JSFTW
    return typeof value !== 'undefined' && (values.includes('array') && Array.isArray(value) || values.includes(typeof value))
})
