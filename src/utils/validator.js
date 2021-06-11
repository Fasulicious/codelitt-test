import Joi from 'joi'

export const postValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().not('', null).required(),
    type: Joi.string().valid('contractor', 'employee').required(),
    tag: Joi.string().valid('c_sharp', 'angular', 'general_frontend', 'seasoned_leader').required(),
    duration: Joi.when('type', {
      switch: [
        {
          is: 'contractor', then: Joi.number().min(0).required()
        },
        {
          is: 'employee', then: Joi.forbidden()
        }
      ]
    }),
    role: Joi.when('type', {
      switch: [
        {
          is: 'contractor', then: Joi.forbidden()
        },
        {
          is: 'employee', then: Joi.string().valid('software_engineer', 'project_manager').required()
        }
      ]
    })
  })

  return schema.validate(data, { abortEarly: false })
}

export const patchValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().not('', null),
    tag: Joi.string().valid('c_sharp', 'angular', 'general_frontend', 'seasoned_leader'),
    duration: Joi.number().min(0),
    role: Joi.string().valid('software_engineer', 'project_manager')
  })

  return schema.validate(data, { abortEarly: false })
}
