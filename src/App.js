import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoItemCard from './components/TodoItemCard';

function App() {
  return (
    <div className="App">
      <TodoItemCard name="Todo Item 1" priority="High" />
    </div>
  );
}

export default App;
