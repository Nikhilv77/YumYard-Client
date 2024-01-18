export const getAllContactsReducer = (
  state = { Contacts: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "GET_ALL_CONTACTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_CONTACTS_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        Contacts: action.payload,
        error: null,
      };
    case "GET_ALL_CONTACTS_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const submitContactReducer = (state={loading:false,success:false,error:null},action)=>{
    switch(action.type){
        case 'SUBMIT_CONTACT_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case 'SUBMIT_CONTACT_SUCCESSFUL':return{
            ...state,
            loading:false,
            success:true,
            error:null
        }
        case 'SUBMIT_CONTACT_FAILED':return{
            ...state,
            loading:false,
            success:false,
            error:action.payload
        }
        default :return state
    }
}
