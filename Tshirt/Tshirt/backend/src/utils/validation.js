// src/utils/validation.js
import Joi from 'joi';

// Common validation schemas
const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'valid ObjectId');
const email = Joi.string().email().lowercase().trim();
const password = Joi.string().min(8).required();
const name = Joi.string().min(2).max(50).trim();
const phone = Joi.string().pattern(/^[0-9]{10,15}$/);
const price = Joi.number().min(0).precision(2);
const quantity = Joi.number().integer().min(0);

// Authentication validations
export const authValidation = {
  register: Joi.object({
    name: name.required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot be longer than 50 characters',
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
    email: email.required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
    password: password.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).message(
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ),
    phone: phone.required().messages({
      'string.pattern.base': 'Please enter a valid phone number',
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number is required'
    }),
    role: Joi.string().valid('user', 'vendor', 'admin').default('user'),
  }),

  sendOtp: Joi.object({
    email: email.required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
    name: name.required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot be longer than 50 characters',
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
    password: password.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).message(
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ).required()
  }),

  verifyOtp: Joi.object({
    userId: objectId.required().messages({
      'string.pattern.name': 'Invalid user ID format',
      'any.required': 'User ID is required',
      'string.empty': 'User ID is required'
    }),
    otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
      'string.length': 'OTP must be 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP is required',
      'string.empty': 'OTP is required'
    })
  }),

  login: Joi.object({
    email: Joi.alternatives().try(
      email,
      Joi.string().min(3).max(30).alphanum()
    ).required().messages({
      'string.email': 'Please enter a valid email address or username',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot be longer than 30 characters',
      'string.alphanum': 'Username can only contain letters and numbers',
      'any.required': 'Email or username is required',
      'string.empty': 'Email or username is required',
      'alternatives.match': 'Please enter a valid email or username'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
  }),

  forgotPassword: Joi.object({
    email: email.required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    })
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: password.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).message(
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ).required()
  })
};

// User validations
export const userValidation = {
  updateProfile: Joi.object({
    name,
    email,
    phone,
    address: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      postalCode: Joi.string(),
      country: Joi.string(),
    }),
  }).min(1),
};

// Order validations
export const orderValidation = {
  createOrder: Joi.object({
    user_id: objectId.required(),
    items: Joi.array()
      .items(
        Joi.object({
          product_id: objectId.required(),
          quantity: quantity.required(),
          price: price.required(),
          name: Joi.string().required(),
          image: Joi.string().uri(),
        })
      )
      .min(1)
      .required(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    paymentMethod: Joi.string()
      .valid('credit_card', 'paypal', 'stripe', 'cod')
      .required(),
    itemsPrice: price.required(),
    taxPrice: price.required(),
    shippingPrice: price.required(),
    totalPrice: price.required(),
  }),

  updateStatus: Joi.object({
    status: Joi.string()
      .valid('pending', 'processing', 'shipped', 'delivered', 'cancelled')
      .required(),
  }),
};

// Product validations
export const productValidation = {
  createProduct: Joi.object({
    name: name.required(),
    description: Joi.string().required(),
    price: price.required(),
    discountPrice: price,
    category: objectId.required(),
    brand: Joi.string(),
    countInStock: quantity.required(),
    images: Joi.array().items(Joi.string().uri()),
    features: Joi.array().items(Joi.string()),
    isFeatured: Joi.boolean(),
  }),

  updateProduct: Joi.object({
    name,
    description: Joi.string(),
    price,
    discountPrice: price,
    category: objectId,
    brand: Joi.string(),
    countInStock: quantity,
    images: Joi.array().items(Joi.string().uri()),
    features: Joi.array().items(Joi.string()),
    isFeatured: Joi.boolean(),
  }).min(1),
};
