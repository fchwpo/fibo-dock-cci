import React from 'react'
import {Link} from 'react-router-dom'

export default () => {
	return (
		<>
			<div>
				I'm Some Other Page
			</div>
			<Link 
				to='/'
				children='Go Back Home!'
			/>
		</>
	)
}