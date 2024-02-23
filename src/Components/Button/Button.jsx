export default function Button({ children, onclick }) {
	return (
		<button className='button' onClick={onclick}>
			{children}
		</button>
	);
}
