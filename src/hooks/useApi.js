import { useState } from "react";

function useApi(apiFunction) {
    const [response, setResponse] = useState({
        data: null,
        isFetching: false,
        error: null,
        isSuccess: false
    });

    const fetchMethod = async (defaultValue) => {
        setResponse({
            ...response,
            data: null,
            isFetching: true
        });

        if(defaultValue != null) {
            setResponse({
                ...response,
                data: defaultValue,
                isFetching: false,
                isSuccess: true
            })
            return;
        }

        try {
            const res = await apiFunction();
            setResponse({
                ...response,
                data: await res.json(),
                isFetching: false,
                isSuccess: res.ok
            });
        }
        catch(err) {
            setResponse({
                ...response,
                error: err.message,
                isFetching: false
            })
        }    
    }

    return [response, fetchMethod];
}

export default useApi;