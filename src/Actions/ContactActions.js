import axios from "axios";

export const getAllContactsActions = ()=>async(dispatch)=>{
    dispatch({type:'GET_ALL_CONTACTS_REQUEST'})
    try {
        const response = await axios.get('https://yumyard-server.onrender.com/api/contacts/getallcontacts');
        dispatch({type:'GET_ALL_CONTACTS_SUCCESSFUL',payload:response.data})
    } catch (error) {
        dispatch({type:'GET_ALL_CONTACTS_FAILED',payload:error})
    }
}

export const submitContactActions = (data)=> async(dispatch)=>{
    console.log(data,"coming form actions");
    dispatch({type:'SUBMIT_CONTACT_REQUEST'});
    try {
        const response = await axios.post('https://yumyard-server.onrender.com/api/contacts/submitcontact',{data})
        dispatch({type:'SUBMIT_CONTACT_SUCCESSFUL'});
    } catch (error) {
        dispatch({type:'SUBMIT_CONTACT_FAILED',payload:error})
    }
}

