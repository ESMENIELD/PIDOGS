const inicialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  dogsDetail: [],
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPER":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        dogsDetail: action.payload,
      };

    case "GET_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "FILTER_TEMPER":
      const dogs = state.allDogs;
      const filterbytemper = dogs.filter((e) =>
        e.temperament?.split(", ").includes(action.payload)
      );
      //console.log(filterbytemper)

      return {
        ...state,
        dogs: filterbytemper,
      };
     
    case "ORDER_NAME":
      const sortName =
        action.payload === "a-z"
          ? state.allDogs.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.allDogs.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      console.log(sortName);


      return {
        ...state,
        dogs: sortName,
      };

    case "ORDER_WEIGHT":
      const sortWeight =
        action.payload === "higer"
          ? state.allDogs.sort(function (a, b) {
              return b.weight_min - a.weight_min;
            })
          : state.allDogs.sort(function (a, b) {
              return a.weight_min - b.weight_min;
            });
      console.log(sortWeight)

      return {
        ...state,
        dogs: sortWeight,
      };
      case 'FILTER_CREATED':
        const filterCreated=
        action.payload === "created"?
        state.allDogs.filter(e=> e.userCreated):
        state.allDogs.filter(e=> !e.userCreated);
        console.log(filterCreated)

        return{
            ...state,
            dogs: filterCreated
        }

        case 'CLEAN_DETAIL':
          return{
            ...state,
            dogsDetail: []
          }


    default:
      return state;
  }
};

export default rootReducer;
