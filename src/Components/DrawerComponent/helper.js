const exercisesSubMenu = [
  {
    name: 'Men',
    icon: 'account',
    navigation: 'ExercisesMen',
    customNavigation: null,
  },
  {
    name: 'Women',
    icon: 'account-outline',
    navigation: 'ExercisesWomen',
    customNavigation: null,
  },
];

export const DRAWER_ITEMS_DATA = [
  {
    name: 'Exercises',
    icon: 'dumbbell',
    navigation: null,
    customNavigation: null,
    subMenu: exercisesSubMenu,
  },
  {
    name: 'Diet',
    icon: 'food-apple',
    navigation: 'Diet',
    customNavigation: null,
    subMenu: [],
  },
  {
    name: 'Meditation',
    icon: 'meditation',
    navigation: 'Meditation',
    customNavigation: null,
    subMenu: [],
  },
  {
    name: 'Progress',
    icon: 'chart-line',
    navigation: 'Progress',
    customNavigation: null,
    subMenu: [],
  },
];
