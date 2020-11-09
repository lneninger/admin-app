import { NavigationItem } from '../shared/layout/layout-main/navigation/navigation.service';

export enum NavigationItemIds {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ABOUT = 'ABOUT',
  SEARCH_MEMBER = 'SEARCH_MEMBER',
  MEMBER = 'MEMBER',
  MEMBER_DASHBOARD = 'MEMBER_DASHBOARD',
  MEMBER_NOTES = 'MEMBER_NOTES',
  MEMBER_PROFILE = 'MEMBER_PROFILE',
  MEMBER_DOCUMENTS = 'MEMBER_DOCUMENTS',
  MEMBER_COMMUNITY = 'MEMBER_COMMUNITY',
  MEMBER_LIS = 'MEMBER_LIS',
  MEMBER_MEDICAID = 'MEMBER_MEDICAID',
  MEMBER_SNAP = 'MEMBER_SNAP',
  MEMBER_VETERAN = 'MEMBER_VETERAN',
  MEMBER_CUSTOM_INTERVIEW = 'MEMBER_CUSTOM_INTERVIEW',
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
    id: 'ABOUT',
    label: 'About',
    routerLink: ['/app/about'],
    icon: 'business_center'
  },
  {
    id: NavigationItemIds.SEARCH_MEMBER,
    label: 'Search',
    routerLink: ['/app/search'],
    icon: 'search'
  },
  {
    id: NavigationItemIds.MEMBER,
    label: 'Member',
    routerLink: ['/app/member'],
    icon: 'fa-id-card',
    fontSet: 'far'
  },
  {
    id: NavigationItemIds.MEMBER_DASHBOARD,
    label: 'Dashboard',
    routerLink: ['/app/member/dashboard'],
    icon: 'dashboard'
  },
  {
    id: NavigationItemIds.MEMBER_NOTES,
    label: 'Notes',
    routerLink: ['/app/member/notes'],
    icon: 'note',
  },
  {
    id: NavigationItemIds.MEMBER_PROFILE,
    label: 'Profile',
    routerLink: ['/app/member/profile'],
    fontSet: 'fa',
    icon: 'fa-id-card-alt'
  },
  {
    id: NavigationItemIds.MEMBER_DOCUMENTS,
    label: 'Documents',
    routerLink: ['/app/member/documents'],
    icon: 'attach_file',
  },
  {
    id: NavigationItemIds.MEMBER_COMMUNITY,
    label: 'Community',
    icon: 'fa-address-card',
    fontSet: 'far',
    routerLink: ['/app/member/community'],
  },
  {
    id: NavigationItemIds.MEMBER_LIS,
    label: 'LIS',
    icon: 'fa-dollar-sign',
    fontSet: 'fas',
    routerLink: ['/app/member/lis'],
  },
  {
    id: NavigationItemIds.MEMBER_MEDICAID,
    label: 'Medicaid',
    icon: 'fa-handshake',
    fontSet: 'far',
    routerLink: ['/app/member/medicaid'],
  },
  {
    id: NavigationItemIds.MEMBER_SNAP,
    label: 'SNAP',
    icon: 'fa-utensils',
    fontSet: 'fas',
    routerLink: ['/app/member/snap'],
  },
  {
    id: NavigationItemIds.MEMBER_VETERAN,
    label: 'Veteran',
    icon: 'fa-address-card',
    fontSet: 'far',
    routerLink: ['/app/member/veteran'],
  },
  {
    id: NavigationItemIds.MEMBER_CUSTOM_INTERVIEW,
    label: 'Interview',
    icon: 'fa-check-list',
    fontSet: 'far',
    routerLink: ['/app/member/custom-interview'],
  },
];
