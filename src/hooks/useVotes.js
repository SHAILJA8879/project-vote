import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function useVotes() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVotes = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "votes"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const votesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVotes(votesData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch votes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addVote = useCallback(async (candidate) => {
    try {
      await addDoc(collection(db, "votes"), {
        candidate,
        createdAt: serverTimestamp()
      });
      await fetchVotes();
    } catch (err) {
      console.error(err);
      throw new Error("Error saving vote!");
    }
  }, [fetchVotes]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  return { votes, loading, error, addVote, refreshVotes: fetchVotes };
}
