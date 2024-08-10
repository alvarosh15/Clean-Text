export default function DocTab({ title, onClick, selectedDoc }) {
  return (
    <div
      className="group flex flex-row text-white items-center hover:cursor-pointer"
      onClick={() => onClick(title)}
    >
      <p
        className={`p-2 rounded-lg transition-all md:text-xl duration-250 ease-in-out ${
          selectedDoc === title ? "bg-sky-800" : "bg-transparent"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
