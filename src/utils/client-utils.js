export function getAllQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
        queryParams[key] = value;
    }
    return queryParams;
}

export const transformEmailAnalyticsResponseObject = (data) => {
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

export const transformCounterAnalyticsResponseObject = (data) => {
    if(typeof data !== "undefined") {
        const obj = {};
        let total_count = 0;
        const success = data[0]?.success || 0;
        const reject = data[0]?.reject || 0;
        const noResponse = data[0]?.noResponse || 0;

        obj["success_total_count"] = success;
        obj["reject_total_count"] = reject;
        obj["no_response_total_count"] = noResponse;
        total_count = success + reject + noResponse;
        return { ...obj, total_count };
    }
    return {};
}