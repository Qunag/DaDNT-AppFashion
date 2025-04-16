const allRoles = {
  user: ['createOrder', 'viewOrders', 'cancelOrder', ''],
  admin: ['getUsers', 'manageUsers', 'manageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
