import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function VoteSystem() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Votes
  const fetchVotes = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "votes"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const votesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVotes(votesData);
    } catch (err) {
      setError("Failed to fetch votes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add Vote
  const addVote = async (candidate) => {
    try {
      await addDoc(collection(db, "votes"), {
        candidate,
        createdAt: serverTimestamp()
      });
      fetchVotes(); // Refresh list
    } catch (err) {
      alert("Error saving vote!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  if (loading) return <p className="text-center py-4">Loading votes...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="p-6 border rounded-3xl bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-4">Cast Your Vote</h3>
      <div className="flex gap-4 mb-8">
        {['Candidate A', 'Candidate B'].map(c => (
          <button 
            key={c}
            onClick={() => addVote(c)}
            className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
          >
            Vote {c}
          </button>
        ))}
      </div>

      <h4 className="font-bold mb-2">Recent Votes:</h4>
      <ul className="space-y-2">
        {votes.map(v => (
          <li key={v.id} className="text-sm border-b border-teal-900/10 dark:border-teal-100/10 pb-1">
            {v.candidate} - <span className="opacity-60">{v.createdAt?.toDate().toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
