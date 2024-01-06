import React from "react";

export default function ExerciseVideos({ name, exerciseVideos }) {
  return (
    <div className="p-1 md:p-6 mt-6">
      <p className="my-4 text-2xl lg:text-3xl font-semibold">
        Watch <span className="capitalize text-rose-600">{name}</span> videos on
        Youtube
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {exerciseVideos.slice(0, 3).map((item, index) => (
          <a
            key={index}
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              className="rounded-lg h-[300px] w-[550px]"
            />
            <p className="text-lg text-wrap font-medium">{item.video.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
