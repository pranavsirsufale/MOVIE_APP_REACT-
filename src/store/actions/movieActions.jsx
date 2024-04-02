export { removemovie } from '../reducers/MovieSlice'
import axios from '../../utils/axios'
import {loadmovie} from '../reducers/MovieSlice'

export const asyncloadmovie = (id) => async (dispatch, getState)=>{
    try {
        const detail =  await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const video = await axios.get(`/movie/${id}/videos`)
        const similar = await axios.get(`/movie/${id}/similar`);
        const translations = await axios.get(`/movie/${id}/translations`)
        const watchproviders =  await axios.get(`/movie/${id}/watch/providers`)

        let theultimatedetails = {
            translations: translations.data.translations.map(t=>t),
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            watchproviders: watchproviders.data.results.IN,
            video:video.data.results.find(m=>m.type === 'Trailer'),
            
        }
        dispatch(loadmovie(theultimatedetails))
    } catch (error) {
        console.log( "Error :" , error);
    }
};


