const INITIAL_STATE = {
  waterIntake: 0, // in ml
  goal: 2000, // default daily goal in ml
  history: [], // array of {date, amount}
};

export const waterReducerActions = {
  ADD_WATER: 'ADD_WATER',
  SET_WATER_GOAL: 'SET_WATER_GOAL',
  RESET_WATER: 'RESET_WATER',
  LOAD_WATER_HISTORY: 'LOAD_WATER_HISTORY',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case waterReducerActions.ADD_WATER:
      return {
        ...state,
        waterIntake: state.waterIntake + action.amount,
        history: [
          ...state.history,
          {
            date: action.date || new Date().toISOString().split('T')[0],
            amount: action.amount,
          },
        ],
      };
    case waterReducerActions.SET_WATER_GOAL:
      return {
        ...state,
        goal: action.goal,
      };
    case waterReducerActions.RESET_WATER:
      return {
        ...state,
        waterIntake: 0,
        history: [],
      };
    case waterReducerActions.LOAD_WATER_HISTORY:
      return {
        ...state,
        history: action.history,
      };
    default:
      return state;
  }
};
