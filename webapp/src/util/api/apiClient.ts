import {API_BASE_URL} from "../hosts";
import {MetricsDataDto} from "./dto/metricsDataDto";

export const getMetricsData = async (): Promise<MetricsDataDto> => {
    return fetch(`${API_BASE_URL}/orders-data`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }

            return res.json()
        })
}