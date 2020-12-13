import { http } from './config';

export default {

    list: () => {
        return http.get('/api/students-list')
    },

    save: (student) => {
        return http.post('/api/student', student)
    }
}

