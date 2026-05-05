import { useEffect, useState } from "react";
import { Navbar, NoteCard, RateLimitedUI } from "../components";
import toast from "react-hot-toast";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/notes",
        );

        if (cancelled) return;

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (cancelled) return;

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 429
        ) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
