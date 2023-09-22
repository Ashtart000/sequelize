import * as yup from 'yup';

export const USER_SCHEMA = yup.object({
    firstName: yup.string().required('Required!').min(2).max(30),
    lastName: yup.string().required('Required!').min(2).max(30),
    email: yup.string().required('Required!').email('Type valid email'),
    password: yup.string().required('Required!').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Not valid password'),
    birthday: yup.date().required('Required!').max(new Date(), 'Not valid birthday'),
    gender: yup.string().required('Required!')
})