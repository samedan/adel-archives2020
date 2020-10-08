
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './../async/asyncReducer';
import { dataFromSnapshot } from './../firestore/firestoreService';

export default function useFirestoreDoc({query, data, deps, shouldExecute=true}) {
    const dispatch = useDispatch();

    
    useEffect(() => {
        // case for a new event 
        if(!shouldExecute) return;


        dispatch(asyncActionStart())

        const unsubscribe = query().onSnapshot(
            snapshot => {
                if(!snapshot.exists){
                    dispatch(asyncActionError({
                        // read from firstore
                        code: 'not-found',
                        message: 'Could not find event'                        
                    }));
                    return;
                }
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => {
                console.log(error);
                dispatch(asyncActionError());}
        );

        return () => {unsubscribe();}
    }, deps) //eslint-disable-line react-hooks/exhaustive-deps
}