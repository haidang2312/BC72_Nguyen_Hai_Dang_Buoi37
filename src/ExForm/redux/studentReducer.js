
const initialState = {
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.ma !== action.payload),
      };
    case 'EDIT_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.ma === action.payload.ma ? action.payload : student
        ),
      };
    default:
      return state;
  }
};

export default studentReducer;
