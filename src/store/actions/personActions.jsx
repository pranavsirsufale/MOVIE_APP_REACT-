export { removeperson } from '../reducers/personSlice'
import axios from '../../utils/axios'
import { loadperson} from '../reducers/personSlice'

export const asyncloadperson = (id) => async (dispatch, getState)=>{
    try {
        const detail =  await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`)
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`)
        const tvCretids = await axios.get(`/person/${id}/tv_credits`)
        const movieCretids = await axios.get(`/person/${id}/movie_credits`)
        
        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedCredits : combinedCredits.data,
            tvCretids : tvCretids.data,
            movieCretids : movieCretids.data,
           
        }
        dispatch(loadperson(theultimatedetails))
    } catch (error) {
        console.log( "Error :" , error);
    }
};


