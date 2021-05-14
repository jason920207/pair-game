import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function MyModal({ open, setOpen, reset, onModalClose }) {
	console.log(open)
	return (
		<Modal
			open={open}
		>
			<Modal.Content image>
				<Modal.Description>
					<Header>WIN</Header>
					<p>
						Play Again?
          </p>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color='black' onClick={() => onModalClose()}>
					Nope
        </Button>
				<Button
					content="Reset"
					labelPosition='right'
					icon='checkmark'
					onClick={() => reset()}
					positive
				/>
			</Modal.Actions>
		</Modal>
	)
}

export default MyModal