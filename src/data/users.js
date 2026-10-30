export const INITIAL_USERS = [
  {
    id: 'user-customer',
    name: 'Abebe Kebede',
    email: 'abebe@gmail.com',
    phone: '0911234567',
    role: 'customer', // 'customer' | 'admin' | 'receiver'
    avatar: '👤',
    roleTitle: 'Customer / Client',
    deliveryArea: 'Bole, Addis Ababa',
    deliveryAddress: 'Near Edna Mall, House 402'
  },
  {
    id: 'user-receiver',
    name: 'Dawit Alemu (Order Receiver)',
    email: 'receiver@ethioprint.com',
    phone: '0933445566',
    role: 'receiver',
    avatar: '🖨️',
    roleTitle: 'Workshop Order Receiver & Production Lead',
    workshopLocation: 'Bole Medhanialem Central Print Workshop'
  },
  {
    id: 'user-admin',
    name: 'Meron Tadesse (Admin)',
    email: 'admin@ethioprint.com',
    phone: '0922334455',
    role: 'admin',
    avatar: '👑',
    roleTitle: 'General Manager / Store Admin',
    permissions: ['all_access', 'pricing', 'analytics', 'manage_users']
  }
];
