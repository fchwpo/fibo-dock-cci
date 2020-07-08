import React, { useState, useEffect } from 'react'
import axios from 'axios'

async function fetchValues(){
	return axios.get('/api/values/current')
}

async function fetchIndexes(){
	return axios.get('/api/values/all')
}

export default () => {
	const [index, setIndex] = useState('');
	const [values, updateValues] = useState({});
	const [seenIndexes, updateIndexes] = useState([]);

	useEffect(() => {
		Promise.all([
			fetchValues(),
			fetchIndexes()
		]).then((data) => {
			const [
				values,
				seenIndexes
			] = data;
			updateValues(values.data);
			updateIndexes(seenIndexes.data);
		})
	}, []);

	const indexesMarkup = () => seenIndexes.map(({number}) => number).join(',');

	const valuesMarkup = () => {
		const entries = [];

		for(let key in values){
			entries.push(
				<div key={key}>
					For index {key} I Calculated {values[key]}
				</div>
			)
		}

		return entries;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios.post('/api/values', {
			index: index
		})

		setIndex('');
	}

	return (
		<>
			<form>
				<label>Enter your index :</label>
				<input 
					value={index}
					onChange={(e) => {
						setIndex(e.target.value);
					}}
				/>
				<button children='Submit' onClick={handleSubmit} />
			</form>
			<h3>Indexes I have seen</h3>
			{indexesMarkup()}
			<h3>Calculated Values:</h3>
			{valuesMarkup()}
		</>
	)
}