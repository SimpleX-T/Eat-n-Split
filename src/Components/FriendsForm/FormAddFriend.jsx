import { useState } from "react";
import Button from "../Button/Button";

export default function FormAddFriend({ setFriends, onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

	function handleSubmit(e) {
		e.preventDefault();

		const id = crypto.randomUUID();

		const newFriend = {
			id,
			name,
			image: `${image}${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);

		console.log(newFriend);

		setName("");
		setImage("https://i.pravatar.cc/48?u=");
	}

	return (
		<form action='#' className='form-add-friend' onSubmit={handleSubmit}>
			<label>Friend Name</label>
			<input
				type='text'
				placeholder="New Friend's Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>Image URL</label>
			<input
				type='text'
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<Button>Add</Button>
		</form>
	);
}
