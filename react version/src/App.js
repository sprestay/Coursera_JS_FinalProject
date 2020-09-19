import React from 'react';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/createStore';
import './App.css';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
