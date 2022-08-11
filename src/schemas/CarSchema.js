const Yup = require('yup');

const schema = {
  store: {
    body: Yup.object().shape({
      model: Yup.string().required("Model is required.").min(3).max(255),
      year: Yup.number().required("Year is required."),
      chassi: Yup.string().required("Chassi is required.").min(17).max(17),
    }),
    params: Yup.object().shape({
      user_id: Yup.number(),
    }),
  },
  update: {
    body: Yup.object().shape({
      model: Yup.string().required("Model is required.").min(3).max(255),
      year: Yup.number().required("Year is required.").min(4).max(4),
      chassi: Yup.string().required("Chassi is required.").min(17).max(17),
    }),
    params: Yup.object().shape({
      id: Yup.number(),
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

module.exports = schema;