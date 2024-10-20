import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.exists()) {
          setMovies(doc.data().favShows || []);
        }
      });
      return () => unsub();
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  if (!user) {
    return <p>Fetching shows...</p>;
  }

  return (
    <div className="relative">
      <div className="relative">
        <img
          className="w-full h-[500px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg"
          alt="background"
        />
        <div className="bg-black/60 absolute top-0 left-0 w-full h-[500px]" />
        <div className="absolute top-[30%] left-5 md:left-16 p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white my-2">
            My Shows
          </h1>
          <p className="text-gray-300 text-lg">{user.email}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white p-4 capitalize">
          Favorite Shows
        </h2>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                >
                  <img
                    className="w-full h-40 block object-cover"
                    src={createImageUrl(
                      movie.backdrop_path || movie.poster_path,
                      "w500"
                    )}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                    <p className="text-xs md:text-sm font-bold text-white text-center px-2">
                      {movie.title}
                    </p>
                    <AiOutlineClose
                      size={25}
                      onClick={() => handleUnlikeShow(movie)}
                      className="absolute top-2 right-2 text-white cursor-pointer"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-lg p-4">No favorite shows yet.</p>
            )}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
