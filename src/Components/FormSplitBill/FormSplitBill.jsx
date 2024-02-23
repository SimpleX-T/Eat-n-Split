import { useState } from "react";
import Button from "../Button/Button";

export default function FormSplitBill({ biller, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [paidByUser, setPaidByUser] = useState("");
	const [whoIsPaying, setWhoIsPaying] = useState("user");

	function handleSetWhoIsPaying(val) {
		setWhoIsPaying((cur) => val);
	}

	const friendsExpense = bill ? +bill - +paidByUser : "";

	function handleSetBill(val) {
		setBill((bill) => val);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!bill || !paidByUser) return;

		onSplitBill(whoIsPaying === "user" ? friendsExpense : -paidByUser);
	}

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {biller.name}</h2>

			<label>Bill value</label>
			<input
				type='text'
				value={bill}
				onChange={(e) => handleSetBill(+e.target.value)}
			/>

			<label>Your Expense</label>
			<input
				type='text'
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser((expense) =>
						+e.target.value > bill ? expense : +e.target.value
					)
				}
			/>

			<label>{biller.name}'s Expense</label>
			<input type='text' value={friendsExpense} disabled />

			<label htmlFor='paySelect'>Who is paying</label>
			<select
				id='paySelect'
				value={whoIsPaying}
				onChange={(e) => handleSetWhoIsPaying(e.target.value)}>
				<option value='user'>You</option>
				<option value='friend'>{biller.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
