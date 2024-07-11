export function getAllQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
        queryParams[key] = value;
    }
    return queryParams;
}

export const transformResponseObject = (data) => {
    if(typeof data !== "undefined") {
        const obj = {};
        let total = 0;
        data?.forEach(item => {
            obj[item.code] = item.matches;
            total = total + item.matches || 0;
        });
        return { ...obj, total };
    }
    return {};
}