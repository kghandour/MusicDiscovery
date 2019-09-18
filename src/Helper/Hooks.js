import {useState, useEffect} from 'react';
import axios from 'axios';

export function UseLocalStorage(key, initialValue){
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item =  window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error){
            console.error("Error retrieving local data. Please report the error: "+ error);
            return initialValue;
        }
    });

    const setValue = value => {
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch(error){
            console.error("Error setting the value to local memory. Please report the error: "+ error);
        }
    };

    return [storedValue, setValue];
}

export function CallAPI(token, initUrl, parameters='',key=''){
    const [data, setData] = useState({hits: {}});
    const [url, setURL] = useState(initUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    var [localSt, setLocalSt] = UseLocalStorage(key,undefined);


    useEffect(()=>{
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            console.log("Token is "+token);

            try{
                if(key!=='' && localSt !== undefined)
                        setData(JSON.parse(localSt));
                else{

                    const headers = {headers: {Authorization: 'Bearer '+token}};
                    if(parameters !== '')
                        headers = {headers: {Authorization: 'Bearer '+token}, params:{parameters}};
                    const result = await axios.get(url , headers);
                    console.log(result);

                    if(key !=='')
                        localStorage.setItem(key,JSON.stringify(result));
                    setData(result.data);
                }
            } catch ( error ){
                setIsError(true);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [token]);

    return [{data, isLoading, isError}, setURL];
};

