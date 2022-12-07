import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        })
        console.log("unsubscribe: " + unsubscribe);
        console.log("user: " + user + " / isLoading: " + isLoading);
        return unsubscribe;

    }, []);

    console.log("user: " + user + " / isLoading: " + isLoading);
    return {user, isLoading};

}

export default useUser;
