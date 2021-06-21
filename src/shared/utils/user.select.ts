export const userSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  city_id: false,
  phone: true,
  district: true,
  number: true,
  street: true,
  type: true,
  city: {
    include: {
      state: true,
    },
  },
};
