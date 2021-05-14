import logo from './logo.svg';
import './App.css';
import {
  Container,
  Icon,
  Menu,
  Input,
  Grid
} from 'semantic-ui-react'
import { useState } from 'react'

import Game from './components/Game'

function App() {

  const [numberOfPairs, setNumberOfPairs] = useState()
  const [pairs, setPairs] = useState(0)

  const setPair = () => {
    setPairs(numberOfPairs)
  }

  const onKeyPress = (evt) => {
    console.log(evt.keyCode)
    if (evt.keyCode == 0) {
      setPairs(numberOfPairs)
    }
  }
  return (
    <div className="App">
      <Menu
        borderless
        fixed={'top'}
      >
        <div className="nav">
          <Menu.Item className="nav-left">Card Flip Game</Menu.Item>

          <Input
            className="nav-right"
            icon={<Icon name='search' inverted circular link onClick={setPair} />}
            placeholder='Type Number of Pairs to Start'
            onChange={(evt) => { setNumberOfPairs(evt.target.value) }}
            value={numberOfPairs}
            type="number"
            onKeyPress={onKeyPress}
          />

        </div>


      </Menu>

      <Container style={{ margin: '5em 0em 0em' }} textAlign='center'>
        <Game numberOfPairs={pairs} />
      </Container>

    </div>
  );
}

export default App;
