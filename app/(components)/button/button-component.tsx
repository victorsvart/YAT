type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    accent: boolean;
};

export const Button = ({ label, accent, ...rest }: Props) => {
    const bgClass = accent ? "bg-gray-8>00" : "bg-gray-950";
    return (
        <button
            className={`${bgClass} text-white font-semibold outline-1 outline-gray-800 rounded-md py-2 hover:bg-gray-900 transition-colors`}
            {...rest}
        >
            {label}
        </button>
    );
};
