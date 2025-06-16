import Channels from '@/components/pages/Channels'
import DirectMessages from '@/components/pages/DirectMessages'
import Search from '@/components/pages/Search'
import Profile from '@/components/pages/Profile'

export const routes = {
  channels: {
    id: 'channels',
    label: 'Channels',
    path: '/channels',
    icon: 'Hash',
    component: Channels
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