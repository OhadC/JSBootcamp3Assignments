import { apiRequest } from "./api";

export const fetchGroups = () => apiRequest({
    url: '/group',
    method: 'GET',
    label: 'fetchGroups'
})

export const fetchAllGroups = () => apiRequest({
    url: '/group', // TODO: all
    method: 'GET',
    label: 'fetchAllGroups'
})
