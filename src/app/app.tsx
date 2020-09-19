import React from 'react';
import ReactDOM from 'react-dom';

import Game from './Game';

const App: React.FC<{ compiler: string, framework: string, hello: string }> = (props) => {
    return(
      <div>
        <input type="text" id="one" onKeyPress={this.handleKeyPress} />
    </div>
    );
}

ReactDOM.render(
  <Game/>,
  document.getElementById("root")
);