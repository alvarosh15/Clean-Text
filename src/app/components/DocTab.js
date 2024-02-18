export default function DocTab({ title, onClick, selectedDoc }) {
  return (
    <div
      className="group flex flex-row text-white items-center hover:cursor-pointer"
      onClick={() => onClick(title)}
    >
      <p
        className={`p-2 rounded-lg transition-all duration-250 ease-in-out ${
          selectedDoc === title ? "bg-slate-500" : "bg-transparent"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
