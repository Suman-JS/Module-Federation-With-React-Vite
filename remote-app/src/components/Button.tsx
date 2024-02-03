import { useState } from "react";

const Button = () => {
	const [count, setCount] = useState(0);

	return (
		<button
			className="bg-red-500 p-3 rounded-full m-3 font-semibold"
			onClick={() => setCount((prev) => prev + 1)}>
			Clicked Me {count} times
		</button>
	);
};

export default Button;
