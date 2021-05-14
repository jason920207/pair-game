import logo from './logo.svg';
import './App.css';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Button,

} from 'semantic-ui-react'


import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <Menu
        borderless
        fixed={'top'}
      >
        <Container text textAlign='center'>
          <Menu.Item>Card Flip Game</Menu.Item>
        </Container>
      </Menu>

      <Container style={{ margin: '5em 0em 0em'}} textAlign='center'>
        <Game />
      </Container>



    </div>
  );
}

export default App;
