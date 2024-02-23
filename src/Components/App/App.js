import { useState } from "react";
import Button from "../Button/Button";
import FriendsList from "../Friends/Friend";
import FormAddFriend from "../FriendsForm/FormAddFriend";
import FormSplitBill from "../FormSplitBill/FormSplitBill";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [friends, setFriends] = useState(initialFriends);
	const [biller, setBiller] = useState(null);

	function handleSetBiller(friend) {
		setBiller((biller) => (biller?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}

	function handleShowAddFriend() {
		setShowAddFriend((formIsOpen) => !formIsOpen);
		setBiller(null);
	}

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	}

	function handleSplitBill(val) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === biller.id
					? {
							...friend,
							balance: friend.balance + val,
					  }
					: friend
			)
		);

		setBiller(null);
	}

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					friends={friends}
					biller={biller}
					onSelect={handleSetBiller}
				/>
				{showAddFriend && (
					<FormAddFriend
						setFriends={setFriends}
						onAddFriend={handleAddFriend}
					/>
				)}
				<Button onclick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{biller && (
				<FormSplitBill biller={biller} onSplitBill={handleSplitBill} />
			)}
		</div>
	);
}
