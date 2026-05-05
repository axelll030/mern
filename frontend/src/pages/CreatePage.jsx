import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios";

const CreatePage = () => {
  const [cardData, setCardData] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setisloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardData.title.trim() || !cardData.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setisloading(true);
    const payload = { ...cardData };
    try {
      await api.post("/notes", payload);
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 429
      ) {
        toast.error("Slow down!");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setisloading(false);
    }
  };

  const handleChange = (e) => {
    console.log("E", e);
    const { name, value } = e.target;

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered rounded-2xl text-base"
                    value={cardData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    name="content"
                    placeholder="Note Content"
                    className="textarea textarea-bordered h-32 rounded-2xl resize-none text-base"
                    value={cardData.content}
                    onChange={handleChange}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
