import Channels from '@/components/pages/Channels'
import DirectMessages from '@/components/pages/DirectMessages'
import Search from '@/components/pages/Search'
import Profile from '@/components/pages/Profile'
import Inbox from '@/components/pages/Inbox'

export const routes = {
  channels: {
    id: 'channels',
    label: 'Channels',
    path: '/channels',
    icon: 'Hash',
    component: Channels
  },
  inbox: {
    id: 'inbox',
    label: 'Inbox',
    path: '/inbox',
    icon: 'Mail',
    component: Inbox
  },
  direct: {
    id: 'direct',
    label: 'Direct Messages',
    path: '/direct',
    icon: 'MessageCircle',
    component: DirectMessages
  },
  search: {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
    component: Search
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: Profile
  }
}

export const routeArray = Object.values(routes)