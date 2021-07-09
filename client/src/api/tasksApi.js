import { get,del,putCall,create } from "./http.service";
const BASE_URL = "/api/tasks"
const TOGGLE_TASK = id => `${BASE_URL}/toggle-reminder/${id}`

export const getTasksApi = async () => {
    const res =  await get(BASE_URL);
    return res;
}

export const deleteTaskApi = async (id) => {
    const res = await del(BASE_URL, id);
    return res;
}

export const toggleReminderApi = async (id) => {
    const res = await putCall(TOGGLE_TASK(id))
    return res;
} 

export const createTaskApi = async (task) => {
    const res = await create(BASE_URL,task)
    return res;
}
