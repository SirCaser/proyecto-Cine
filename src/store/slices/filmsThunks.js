import { getMoviesBy, getMoviesByID } from "../../services/films"
import { setFilms, startLoadingFilms } from "./filmsSlice"


//El thunk es una funcion que devuelve una accion asincrona
export const getFilms = (keyword) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingFilms())

        try {
            if(keyword == null){
                const res = await getMoviesBy();
                if (!res.ok) {
                    //Notificar error con dispatch
                }
                const data = await res.json();
                const films = data.results.slice(0, 16);
    
                dispatch(setFilms({ films: films }))
            } else {
                const res = await getMoviesBy(keyword);
                if (!res.ok) {
                    //Notificar error con dispatch
                }
                const data = await res.json();
                const films = data.results;
    
                dispatch(setFilms({ films: films }))
            }

        } catch (error) {
            //Notificar error con dispatch
        }

    }
}
export const getFilmsID = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingFilms())

        try {
            const res = await getMoviesByID(id);
            if (!res.ok) {
                //Notificar error con dispatch
            }
            const data = await res.json();
            const films = data;

            dispatch(setFilms({ films: films }))

        } catch (error) {
            //Notificar error con dispatch
        }

    }
}