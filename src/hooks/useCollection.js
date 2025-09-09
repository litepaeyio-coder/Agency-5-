import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const useCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        setLoading(true);
        const q = collection(db, collectionName);
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setData(items);
            setLoading(false);
        }, (err) => {
            setError(err);
            setLoading(false);
            console.error("Error fetching collection:", err);
        });

        return () => unsubscribe();
    }, [collectionName]);

    useEffect(() => {
        const unsubscribe = fetchData();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [fetchData]);

    const refresh = () => {
        fetchData();
    };

    return { data, loading, error, refresh };
};

export default useCollection;
