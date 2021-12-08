import { NavigationItem } from '../shared/layout/layout-main/navigation/navigation.models';

export enum NavigationItemIds {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ABOUT = 'ABOUT',

  ADMIN = 'ADMIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',

  SETTINGS = 'SETTINGS',
  SETTINGS_DASHBOARD = 'SETTINGS_DASHBOARD',
  SETTINGS_BANKING = 'SETTINGS_BANKING',

  PAYMENTMETHOD_NEW = 'PAYMENTMETHOD_NEW',
  PAYMENTMETHOD_EDIT = 'PAYMENTMETHOD_EDIT',


  ADMIN_USERS = 'ADMIN_USERS',
  ADMIN_ROLES = 'ADMIN_ROLES',

  PRODUCT_CATEGORIES = 'PRODUCT_CATEGORIES',
  PRODUCTS = 'PRODUCTS',

  QUOTES = 'QUOTES',
  QUOTE_NEW = 'QUOTE_NEW',
  QUOTE_EDIT = 'QUOTE_EDIT',
  QUOTE_DASHBOARD = 'QUOTE_DASHBOARD',
  QUOTE_NOTES = 'QUOTE_NOTES',
  QUOTE_UPLOAD = 'QUOTE_UPLOAD',
  QUOTE_CALCULATE = 'QUOTE_CALCULATE',
  QUOTE_DOCUMENTS = 'QUOTE_DOCUMENTS',
  QUOTE_DOCUMENT = 'QUOTE_COMMUNITY',
  QUOTE_LIS = 'QUOTE_LIS',
  QUOTE_MEDICAID = 'QUOTE_MEDICAID',
  QUOTE_SNAP = 'QUOTE_SNAP',
  QUOTE_VETERAN = 'QUOTE_VETERAN',
  QUOTE_CUSTOM_INTERVIEW = 'QUOTE_CUSTOM_INTERVIEW',

  SPECIALISTS = 'SPECIALISTS',
  SPECIALIST_NEW = 'SPECIALIST_NEW',
  SPECIALIST_EDIT = 'SPECIALIST_EDIT',
  SPECIALIST_DASHBOARD = 'SPECIALIST_DASHBOARD',
  SPECIALIST_NOTES = 'SPECIALIST_NOTES',
  SPECIALIST_UPLOAD = 'SPECIALIST_UPLOAD',
  SPECIALIST_CALCULATE = 'SPECIALIST_CALCULATE',
  SPECIALIST_DOCUMENTS = 'SPECIALIST_DOCUMENTS',
  SPECIALIST_DOCUMENT = 'SPECIALIST_DOCUMENT',



  DIVIDER = 'DIVIDER'

}

export const navigationItems: NavigationItem[] = [
 {
    id: NavigationItemIds.HOME,
    label: 'Home',
    routerLink: ['/app'],
    icon: 'home'
  },
  {
    id: NavigationItemIds.DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/dashboard'],
    icon: 'dashboard'
  },
  {
    id: NavigationItemIds.ADMIN,
    label: 'Admin',
    routerLink: ['/app/admin'],
    bottom: true,
    icon: 'admin_panel_settings'
  },

  {
    id: NavigationItemIds.ADMIN_DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/admin/dashboard'],
    icon: 'dashboard'
  },
  {
    id: NavigationItemIds.ADMIN_USERS,
    label: 'Users',
    routerLink: ['/app/admin/users'],
    icon: 'manage_accounts'
  },
  {
    id: NavigationItemIds.ADMIN_ROLES,
    label: 'Roles',
    routerLink: ['/app/admin/roles'],
    icon: 'lock'
  },
  // {
  //   id: 'ABOUT',
  //   label: 'About',
  //   routerLink: ['/app/about'],
  //   icon: 'business_center'
  // },

  {
    id: NavigationItemIds.SETTINGS,
    label: 'Settings',
    routerLink: ['/app/settings'],
    bottom: true,
    icon: 'admin_panel_settings'
  },
  {
    id: NavigationItemIds.SETTINGS_DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/settings/dashboard'],
    icon: 'dashboard'
  },
  {
    id: NavigationItemIds.SETTINGS_BANKING,
    label: 'Banking',
    routerLink: ['/app/settings/banking'],
    icon: 'account_balance'
  },

  {
    id: NavigationItemIds.PAYMENTMETHOD_NEW,
    label: 'New Payment',
    routerLink: ['/app/settings/banking/'],
    icon: 'account_balance'
  },
  {
    id: NavigationItemIds.PAYMENTMETHOD_EDIT,
    label: 'Edit Payment',
    routerLink: ['/app/settings/banking/'],
    icon: 'account_balance'
  },


  {
    id: NavigationItemIds.PRODUCT_CATEGORIES,
    label: 'Product Categories',
    routerLink: ['/app/product-categories'],
    // icon: 'fa-object-group',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.PRODUCTS,
    label: 'Products',
    routerLink: ['/app/products'],
    // icon: 'fa-object-group',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.QUOTES,
    label: 'Quotes',
    routerLink: ['/app/quotes'],
    // icon: 'fa-id-card',
    // fontSet: 'far'
  },
  {
    id: NavigationItemIds.QUOTE_NEW,
    label: 'New Quote',
    routerLink: ['/app/quotes/new'],
    // icon: 'fa-plus',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.QUOTE_EDIT,
    label: 'New Quote',
    routerLink: ['/app/quotes/{id}'],
    // icon: 'fa-edit',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.QUOTE_DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/quotes/dashboard'],
    // icon: 'dashboard'
  },
  {
    id: NavigationItemIds.QUOTE_NOTES,
    label: 'Notes',
    routerLink: ['/app/quotes/notes'],
    // icon: 'note',
  },
  {
    id: NavigationItemIds.QUOTE_CALCULATE,
    label: 'Profile',
    routerLink: ['/app/quotes/profile'],
    // fontSet: 'fa',
    // icon: 'fa-id-card-alt'
  },
  {
    id: NavigationItemIds.QUOTE_DOCUMENTS,
    label: 'Documents',
    routerLink: ['/app/quotes/{id}/documents'],
    // icon: 'attach_file',
  },
  {
    id: NavigationItemIds.QUOTE_DOCUMENT,
    label: 'Community',
    icon: 'fa-address-card',
    fontSet: 'far',
    routerLink: ['/app/quotes/community'],
  },

  {
    id: NavigationItemIds.SPECIALISTS,
    label: 'Specialists',
    routerLink: ['/app/specialists'],
    // icon: 'fa-id-card',
    // fontSet: 'far'
  },
  {
    id: NavigationItemIds.SPECIALIST_NEW,
    label: 'New Specialist',
    routerLink: ['/app/specialists/new'],
    // icon: 'fa-plus',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.SPECIALIST_EDIT,
    label: 'New Specialist',
    routerLink: ['/app/specialists/{id}'],
    // icon: 'fa-edit',
    // fontSet: 'fas'
  },
  {
    id: NavigationItemIds.SPECIALIST_DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/specialists/dashboard'],
    // icon: 'dashboard'
  },
  {
    id: NavigationItemIds.SPECIALIST_NOTES,
    label: 'Notes',
    routerLink: ['/app/specialists/notes'],
    // icon: 'note',
  },
  {
    id: NavigationItemIds.SPECIALIST_CALCULATE,
    label: 'Profile',
    routerLink: ['/app/specialists/profile'],
    // fontSet: 'fa',
    // icon: 'fa-id-card-alt'
  },
  {
    id: NavigationItemIds.SPECIALIST_DOCUMENTS,
    label: 'Documents',
    routerLink: ['/app/specialists/{id}/documents'],
    // icon: 'attach_file',
  },

];
