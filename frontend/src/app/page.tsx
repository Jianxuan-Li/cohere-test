"use client";
// disable SSR
import { useState, useRef, useEffect } from "react";
import api from "@/utils/api";
import { examplePosting, exampleResume } from "@/utils/examples";
import { lineAtAngle } from "@/utils/draw";

export default function Home() {
  const [formData, setFormData] = useState({
    posting: examplePosting,
    resume: exampleResume,
  });
  const [result, setResult] = useState<null | number>(null);
  const canvasRef = useRef(null);

  const draw = (angle: number) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startingXPosition = canvas.width / 2;
      const startingYPosition = canvas.height / 2;
      const length = 100;

      const {x, y} = lineAtAngle(startingXPosition, startingYPosition, length, angle, ctx);
      lineAtAngle(startingXPosition, startingYPosition, length, -90, ctx);

      ctx.font = "12px Arial";
      ctx.fillText("Job", canvas.width / 2 - 20, canvas.height / 2 - 110);

      ctx.fillText("Resume", x, y);
      if (angle > -90 && angle < -45) {
        ctx.fillText("Good match", x - 20, y + 20);
      }else if (angle >= -45 && angle < 0) {
        ctx.fillText("Bad match", x - 20, y + 20);
      }
    }
  };

  const handleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await api.post("/similarity/", {
      posting: formData.posting,
      resume: formData.resume,
    });

    const similarity = Math.round(data.similarity * 10000) / 100;
    setResult(similarity);
    draw(-similarity);
  };

  // useEffect(() => {
  //   draw(-40);
  // }, [canvasRef]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="mt-4">
        <p className="text-2xl font-bold text-center">
          Test how well your resume matches the job position
        </p>
      </div>
      <div className="z-10 mt-4 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="posting" className="mb-2">
                the requirement and/or responsibilities of a job posting
              </label>
              <textarea
                id="posting"
                name="posting"
                onChange={handleChange}
                rows={20}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Paste the requirement and/or responsibilities of a job posting here"
                value={formData.posting}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="resume" className="mb-2">
                Your resume, experience, skills, or projects
              </label>
              <textarea
                id="resume"
                name="resume"
                rows={20}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Paste your resume, experience, skills, or projects here"
                value={formData.resume}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Submit
          </button>
          {result && (
            <>
              <div className="mt-4">
                <p className="text-2xl font-bold text-center">
                  Similarity: {result}%
                </p>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-center">
            <canvas ref={canvasRef} width={300} height={300}></canvas>
          </div>
        </form>
      </div>
    </main>
  );
}
