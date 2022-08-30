import MoonLoader from "react-spinners/MoonLoader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="  ">
        <MoonLoader size={80} />
      </div>
    </div>
  );
}
