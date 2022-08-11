const Yup = require('yup');

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      email: Yup.string().required(),
      password: Yup.string().required().min(6).max(50),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      email: Yup.string().required(),
      password: Yup.string().nullable().min(6).max(50),
    }),     
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
}