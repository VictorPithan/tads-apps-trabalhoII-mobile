import * as yup from "yup";

export const createPostValidator = yup.object({
    title: yup.string().required('O título do post é obrigatório'),
    content: yup.string().required('O conteúdo do post é obrigatório')
});