import { http } from './config';

export default {

    list: () => {
        return http.get('/api/students-list')
    },

    save: (student) => {
        return http.post('/api/student', student)
    },

    update: (student) => {
        return http.patch('/api/student/:ra', student)
    },

    erase: (ra) => {
        return http.delete(`/api/student/${ra}`, { data: ra })
    }
}

