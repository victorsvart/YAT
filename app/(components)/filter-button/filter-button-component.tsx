type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  selected: boolean;
};

export const FilterButton = ({ label, selected, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
        selected
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};
