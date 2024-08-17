import { api } from "./config/axiosConfig";
const endPoint = "/location";

export const LocationAPI = {
    saveLocation: async function (code, name) {
        const response = await api.request({
            url: endPoint,
            method: 'POST',
            data: { code, name }
        });
        console.log("response.data:", response.data)
        return response.data;
    },

    getAllLocations: async function () {
        const response = await api.request({
            url: endPoint,
            method: 'GET'
        });

        return response.data;
    },

    getAutoCompleteLocations: async function (key) {
        const response = await api.request({
            url: `${endPoint}/autocomplete`,
            method: 'GET',
            params: { key }
        });

        return response.data;
    }
} 