import * as React from 'react';

var alphabet: { [id: string] : string; } = {
    'A': "eeiiiiee" +
        "eiiiiiie" +
        "iieeeeii" +
        "iiiiiiii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii",
    'B': "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeii" +
        "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeii" +
        "iiiiiiii" +
        "iiiiiiii",
    'C': "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iiiiiiii" +
        "iiiiiiii",
    'E': "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeee" +
        "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeee" +
        "iiiiiiii" +
        "iiiiiiii",
    'G': "eiiiiiie" +
         "iiiiiiii" +
         "iieeeeee" +
         "iieeeeee" +
         "iieeiiii" +
         "iieeeeii" +
         "iiiiiiii" +
         "eiiiiiie",
    'H': "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii",
    'I': "iiiiiiii" +
        "iiiiiiii" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee" +
        "iiiiiiii" +
        "iiiiiiii",
    'L': "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iieeeeee" +
        "iiiiiiii" +
        "iiiiiiii",
    'M': "iieiieii" +
        "iiiiiiii" +
        "iieiieii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii",
    'N': "iieeeeii" +
        "iiieeeii" +
        "iieieeii" +
        "iieeieii" +
        "iieeeiii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii",
    'O': "eiiiiiie" +
        "iiiiiiii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iiiiiiii" +
        "eiiiiiie",
    'P': "eiiiiiie" +
    "iiiiiiii" +
    "iieeeeii" +
    "iieeeeii" +
    "iiiiiiie" +
    "iieeeeee" +
    "iieeeeee" +
    "iieeeeee",
    'R': "iiiiiiii" +
        "iiiiiiii" +
        "iieeeeii" +
        "iiiiiiii" +
        "iiiiiiii" +
        "iieeeiee" +
        "iieeeeie" +
        "iieeeeei",
    'S': "eiiiiiie" +
        "iiiiiiii" +
        "iieeeeii" +
        "iieeeeee" +
        "eiiiiiie" +
        "eeeeeeii" +
        "iieeeeii" +
        "eiiiiiie",
    'T': "iiiiiiii" +
        "iiiiiiii" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee" +
        "eeeiieee",
    'W': "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieeeeii" +
        "iieiieii" +
        "iiiiiiii" +
        "iieiieii",
    's': "eeeeeeee" +
    "eeemmeee" +
    "mmemmemm" +
    "mmeeeemm" +
    "eeemmeee" +
    "eemmmmee" +
    "emmmmmme" +
    "eemmmmee",
    ' ': "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee" +
    "eeeeeeee",
};

class Player extends React.Component {
    render() {
        var left = 20 + 'px';
        var top = 20 + 'px';
        var padding = 20 + 'px';
        return (
            <div id="player" style={{padding, left, top,position:'absolute',backgroundColor: 'blue'}}/>
        )
    }
}

interface Pixel {
    image: string;
    id: number;
}

interface Letter {
    corr_char: string;
    char_display: string;
}

class BoardObject {
    image: string;
    num_rows: number;
    num_col: number;
    curr_x: number;
    curr_y: number;
    pixel_size: number;

    constructor(t_image: string, t_num_rows: number, t_num_col: number, t_curr_x: number, t_curr_y: number, t_pixel_size: number) {
        this.image = t_image;
        this.num_rows = t_num_rows;
        this.num_col = t_num_col;
        this.curr_x = t_curr_x;
        this.curr_y = t_curr_y;
        this.pixel_size = t_pixel_size;
    }
}

// given an array of pixels and some more info, converts into some HTML
const renderPixels = (pixels: Pixel[], start_x: number, start_y: number, num_per_row: number, padding_size: number) => {
    var curr_row = 0;
    var num_curr_row_pixels = 0;
    return pixels.map(pixel => {
      var left = start_x + (padding_size * num_curr_row_pixels * 2) + 'px';
      var top = start_y + (padding_size * 2 * curr_row) + 'px';
      var padding = padding_size + 'px';
      num_curr_row_pixels++;
      if (num_curr_row_pixels >= num_per_row) {
          curr_row++;
          num_curr_row_pixels = 0;
      }
      return <div style={{padding, left, top,position:'absolute',backgroundColor: pixel.image}} />;
    });
};

const renderHealthBar = (remaining_health: number, max_health: number) => {
    var curr_health = (remaining_health / max_health) * 100;
    var needed_padding = "4px";
    if (curr_health <= 0) {
        needed_padding = "0px";
    }
    return (
    <div style={{borderStyle: "solid", borderColor: "white", padding: "5px", maxWidth: "100px", minWidth: '100px'}}>
        <div style={{backgroundColor: "white", maxWidth: curr_health, minWidth: curr_health, padding: needed_padding}}/>
    </div>);
};

const renderString = (message: string, start_x: number, start_y: number) => {
    let letter_list = [];
    for (var currChar = 0; currChar < message.length; currChar++) {
        // fetch corresponding alphabet character,
        // convert into pixel array
        letter_list.push(getArrFromString(alphabet[message[currChar]]));
    }

    // render each pixel array
    var x_position = start_x;
    return letter_list.map(letter => {
        x_position += 20;
        return renderPixels(letter, x_position, start_y, 8, 1);
    });
};

const renderCollisionMessage = (is_collision: number) => {
    if (is_collision) {
        return "Hello.";
    } else {
        return "";
    }
};

const getArrFromString = (board_str: string) => {
    let board = [];
    for (var curr_char = 0; curr_char < board_str.length; curr_char++) {
        var background_color = 'white';
        
        if (board_str[curr_char] === 'x') {
            background_color = '#E3DEC4';
        }

        if (board_str[curr_char] === 'y') {
            background_color = '#3569C0';
        }

        if (board_str[curr_char] === 'z') {
            background_color = '#45A1C9';
        }

        if (board_str[curr_char] === 'o') {
            background_color = '#564A75';
        }

        if (board_str[curr_char] === 'p') {
            background_color = '#151940';
        }

        if (board_str[curr_char] === 'e') {
            background_color = 'transparent';
        }

        if (board_str[curr_char] === 'q') {
            background_color = 'pink';
        }

        if (board_str[curr_char] === 'n') {
            background_color = 'black';
        }

        if (board_str[curr_char] === 'm') {
            background_color = 'red';
        }

        if (board_str[curr_char] === 'f') {
            background_color = '#10d102';
        }

        if (board_str[curr_char] === 'd') {
            background_color = '#087500';
        }

        board.push({
            image: background_color,
            id: curr_char
        });
    }

    return board;
};

function isRectangleCollision (start_x1: number, width1: number, start_y1: number, height1: number,
                               start_x2: number, width2: number, start_y2: number, height2: number) : boolean {
    // check to see if anything is out of bounds
    if ((start_x1 > (start_x2 + width2)) || (start_x2 > (start_x1 + width1)) 
     || (start_y2 > (start_y1 + height1)) || (start_y1 > (start_y2 + height2))) {
        return false;
    }

    return true;
}

// pass in player location and enemy points
// return true if player is colliding with other string passed in
function checkPlayerEnemyCollision (player: BoardObject, enemy: BoardObject) : boolean {
    // first, check overall rectangle collision to avoid unnecessary looping
    if (!isRectangleCollision(player.curr_x, player.num_rows, player.curr_y, player.num_col,
                              enemy.curr_x, enemy.num_rows, enemy.curr_y, enemy.num_col)) {
        return false;
    }

    for (var curr_pixel = 0; curr_pixel < player.image.length; curr_pixel++) {
        for (var curr_enemy_pixel = 0; curr_enemy_pixel < enemy.image.length; curr_enemy_pixel++) {
            if (player.image[curr_pixel] != 'e' && enemy.image[curr_enemy_pixel] != 'e') {
                var player_pixel_x = (curr_pixel % player.num_rows) * player.pixel_size;
                var player_pixel_y = (curr_pixel / player.num_rows) * player.pixel_size;
                var enemy_pixel_x = (curr_enemy_pixel % enemy.num_rows) * enemy.pixel_size;
                var enemy_pixel_y = (curr_enemy_pixel / enemy.num_rows) * enemy.pixel_size;

                if (isRectangleCollision(player.curr_x + player_pixel_x, player.pixel_size,
                                         player.curr_y + player_pixel_y, player.pixel_size,
                                         enemy.curr_x + enemy_pixel_x, enemy.pixel_size,
                                         enemy.curr_y + enemy_pixel_y, enemy.pixel_size
                                         )) {
                    return true;
                }
            }
        }
    }
    return false;
};

export default class Game extends React.Component {
  state = {
    x_count: 50,
    y_count: 50,
    starting_y: 50,
    starting_x: 50,
    max_board_x: 505,
    max_board_y: 345,
    num_board_rows: 50,
    board_string: "xxxxxxxxxxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppp" + 
                  "xxxxxxxxxxxxxxxxxxxxxxxxxzzayyyyyyyopppppppppppppp" + 
                  "xxxxxxxxxxxxxxxxxxxxxxxzzaayyyyyyooppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppppppp" + 
                  "xxxxxxxxxxxxxxxxxxxxzzaayyyyyyoopppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzayyyyyyyyopppppppppppppppppppp" +
                  "xxxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppppppppoo" +
                  "xxxxxxxxxxxxxxxxxxxxzzayyyyyyyoppppppppppppppppoyy" +
                  "xxxxxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppppoyyy" + 
                  "xxxxxxxxxxxxxxxxxxxxxzayyyyyyyyoppppppppppppooyyyy" + 
                  "xxxxxxxxxxxxxxxxxxxxxzzzaayyyyyyyooopppppoooyyyyyy" +
                  "xxxxxxxxxxxxxxxxxxxxxxxzzzaaayyyyyyyoooooyyyyyyyaa" + 
                  "xxxxxxxxxxxxxxxxxxxxxxxxxzzzzayyyyyyyyyyyyyyyyaazz" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxzzayyyyyyyyyyyyyaazzzx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxzzaaayyyyyyyyaazzzxxx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzzzzaaaaaaaazzzxxxxx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzzzzzzzzzzxxxxxxx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
                  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    board: [
        {
            image: 'blue',
            id: 0
        },
        {
            image: 'blue',
            id: 1    
        },
        {
            image: 'blue',
            id: 2   
        },
        {
            image: 'blue',
            id: 3
        },
        {
            image: 'purple',
            id: 4    
        },
        {
            image: 'blue',
            id: 5   
        }
    ],
    player_string: "eeeeeeeeieeeieee" +
                   "eeeeeeeeiieeiiee" +
                   "iieeeeeeiiiiiiie" + 
                   "iieeeeemmmmmmmmm" +
                   "iieeeeemnnnnnnnm" +
                   "iieeeeemmmmmmmmm" +
                   "iieeeeeeiiiqiiie" + 
                   "iieeeeeeeinnniee" +
                   "iiiiiiiiiiiiiiee" +
                   "iiiiiiiiiiiiiiie" +
                   "iiiiiiiiiiiiiiie" +
                   "iiiiiiiiiiiiiiie" +
                   "iiiiiiiiiiiiiiie" +
                   "iiiiiiiiiiiiiiee" +
                   "iieiieeeeiieiiee" +
                   "iieiieeeeiieiiee",
    player_string_right:"eeeieeeieeeeeeee" +
                        "eeiieeiieeeeeeee" +
                        "eiiiiiiieeeeeeii" + 
                        "mmmmmmmmmeeeeeii" +
                        "mnnnnnnnmeeeeeii" +
                        "mmmmmmmmmeeeeeii" +
                        "eiiiqiiieeeeeeii" + 
                        "eeinnnieeeeeeeii" +
                        "eeiiiiiiiiiiiiii" +
                        "eiiiiiiiiiiiiiii" +
                        "eiiiiiiiiiiiiiii" +
                        "eiiiiiiiiiiiiiii" +
                        "eiiiiiiiiiiiiiii" +
                        "eeiiiiiiiiiiiiii" +
                        "eeiieiieeeeiieii" +
                        "eeiieiieeeeiieii",
    player_obj: [],
    player_state: "left",
    enemy_string:  "eeeeeeeedeeedeee" +
                   "eeeeeeeeffeeffee" +
                   "ddeeeeeefffffffe" + 
                   "ffeeeeeqqqqqqqqq" +
                   "ddeeeeeqnnnnnnnq" +
                   "ffeeeeeqqqqqqqqq" +
                   "ddeeeeeefffmfffe" + 
                   "ffeeeeeeefnnnfee" +
                   "ffddfffddfffffee" +
                   "fddfffddfffffffe" +
                   "ffddfffddffffffe" +
                   "fddfffddfffffffe" +
                   "ffddfffddffffffe" +
                   "fffddfffddffffee" +
                   "ffeffeeeeffeffee" +
                   "ddeddeeeeddeddee",
    enemy_obj: [],
    is_collision: 0,
    board_state: "",
    player_health: 92,
    enemy_health: 92,
    player_moves: [
        {
            'name': 'SCRATCH',
            'SCRATCH': 10
        },
        {
            'name': 'HISS',
            'HISS': 5
        }, {
            'name': 'LASER',
            'LASER': 20
        }
    ],
    curr_player_move: 'SCRATCH',
    curr_selected_index: 0,
    turn_message: "BATTLE",
    enemy_moves: [
        {
            'name': 'SPLASH',
            'SPLASH': 10
        }, 
        {
            'name': 'BITE',
            'BITE': 15
        }, 
        {
            'name': 'ROLL',
            'ROLL': 20
        }
    ]
  };

  increment = () => {
    if(this.state.x_count < (this.state.starting_x + this.state.max_board_x - 40)) {
        this.setState({
            x_count: (this.state.x_count + 5)
        });

        if (this.state.player_state === "right") {
            this.setState({
                player_obj: getArrFromString(this.state.player_string)
            });
            this.setState({
                player_state: "left"
            });
        }

        var curr_player = new BoardObject(this.state.player_string, 16, 16, this.state.x_count, this.state.y_count, 1);
        var curr_enemy = new BoardObject(this.state.enemy_string, 16, 16, 300, 300, 1);

        if (checkPlayerEnemyCollision(curr_player, curr_enemy)) {
            this.state.is_collision = 1;
            this.state.board_state = "battle";
            this.state.board = getArrFromString("");
            this.setState({
                x_count: 100
            });
            this.setState({
                y_count: 200
            });
        } else {
            this.state.is_collision = 0;
        }
    }
  };

  increment_y = () => {
    if(this.state.y_count < (this.state.starting_y + this.state.max_board_y - 40)) {
        this.setState({
            y_count: (this.state.y_count + 5)
        });

        var curr_player = new BoardObject(this.state.player_string, 16, 16, this.state.x_count, this.state.y_count, 1);
        var curr_enemy = new BoardObject(this.state.enemy_string, 16, 16, 300, 300, 1);

        if (checkPlayerEnemyCollision(curr_player, curr_enemy)) {
            this.state.is_collision = 1;
            this.state.board_state = "battle";
            this.state.board = getArrFromString("");
            this.setState({
                x_count: 100
            });
            this.setState({
                y_count: 200
            });
        } else {
            this.state.is_collision = 0;
        }
    }
  };

  decrement = () => {
    if(this.state.x_count > this.state.starting_x) {
        this.setState({
            x_count: (this.state.x_count - 5)
        });

        if (this.state.player_state === "left") {
            this.setState({
                player_obj: getArrFromString(this.state.player_string_right)
            });
            this.setState({
                player_state: "right"
            });
        }

        var curr_player = new BoardObject(this.state.player_string, 16, 16, this.state.x_count, this.state.y_count, 1);
        var curr_enemy = new BoardObject(this.state.enemy_string, 16, 16, 300, 300, 1);

        if (checkPlayerEnemyCollision(curr_player, curr_enemy)) {
            this.state.is_collision = 1;
            this.state.board_state = "battle";
            this.state.board = getArrFromString("");
            this.setState({
                x_count: 100
            });
            this.setState({
                y_count: 200
            });
        } else {
            this.state.is_collision = 0;
        }
    }
  };

  decrement_y = () => {
    if(this.state.y_count > this.state.starting_y) {
        this.setState({
            y_count: (this.state.y_count - 5)
        });

        var curr_player = new BoardObject(this.state.player_string, 16, 16, this.state.x_count, this.state.y_count, 1);
        var curr_enemy = new BoardObject(this.state.enemy_string, 16, 16, 300, 300, 1);

        if (checkPlayerEnemyCollision(curr_player, curr_enemy)) {
            this.state.is_collision = 1;
            this.state.board_state = "battle";
            this.state.board = getArrFromString("");
            this.setState({
                x_count: 100
            });
            this.setState({
                y_count: 200
            });
        } else {
            this.state.is_collision = 0;
        }
    }
  };

  handleKeyPress = (event) => {
    if (this.state.board_state === "battle") {
        if (this.state.curr_selected_index < 0) {
            this.setState({
                curr_selected_index: 0
            });
        }

        if (this.state.curr_selected_index > 2) {
            this.setState({
                curr_selected_index: 2
            });
        }
        if(event.key === 'w' || event.key === 'W') {
            if (this.state.curr_selected_index >= 0) {
                this.setState({
                    curr_selected_index: this.state.curr_selected_index - 1
                });

                this.setState(
                    {
                        curr_player_move: this.state.player_moves[this.state.curr_selected_index]['name']
                    }
                );
            }
        }
        else if(event.key === 's' || event.key === 'S') {
            if (this.state.curr_selected_index + 1 <= 3) {
                console.log("Update!");
                this.setState({
                    curr_selected_index: this.state.curr_selected_index + 1
                });

                this.setState(
                    {
                        curr_player_move: this.state.player_moves[this.state.curr_selected_index]['name']
                    }
                );
            }
        }
        console.log(this.state.player_moves[this.state.curr_selected_index]);

        if(event.key === 'Enter'){
            if (this.state.player_health > 0) {
                this.setState({
                    enemy_health: this.state.enemy_health - this.state.player_moves[this.state.curr_selected_index][this.state.player_moves[this.state.curr_selected_index]['name']]
                });
            }
            

            var enemy_move_index = Math.floor(Math.random() * 3);
            if (this.state.enemy_health <= 0) {
                this.setState({
                    turn_message: "WATERMELON LOST"
                });
            } else {
                this.setState({
                    player_health: this.state.player_health - this.state.enemy_moves[enemy_move_index][this.state.enemy_moves[enemy_move_index]['name']]
                });

                if (this.state.player_health <= 0) {
                    this.setState({
                        turn_message: "CATBORG LOST"
                    })
                }
            } 
        }
    } else {
        if(event.key === 'w' || event.key === 'W'){
            this.decrement_y();
        }
    
        if(event.key === 'a' || event.key === 'A'){
            this.decrement();
        }
    
        if(event.key === 's' || event.key === 'S'){
            this.increment_y();
        }
    
        if(event.key === 'd' || event.key === 'D'){
            this.increment();
        }
    }
  }

  renderPlayerActions = () => {
    var curr_action = -1;
    return this.state.player_moves.map(move => {
        curr_action++;
        var curr_move_str = move['name'];
        if (curr_move_str === this.state.curr_player_move) {
            curr_move_str += 's';
        }
        return renderString(curr_move_str, 25, 300 + (50 * curr_action));
    });     
  }

  constructor(props) {
    super(props);
    this.state.board = getArrFromString(this.state.board_string);
    this.state.player_obj = getArrFromString(this.state.player_string);
    this.state.enemy_obj = getArrFromString(this.state.enemy_string);
  }

  render () {
    var left = (this.state.x_count  + 4) + 'px';
    var top = this.state.y_count + 17 + 'px';
    var padding = 20 + 'px';

    if (this.state.board_state === "battle") {
        return (
            <div style={{ backgroundColor: "#1f1f1f"}} onKeyDown={this.handleKeyPress}>
                <div id="player">{renderPixels(this.state.player_obj, this.state.x_count, this.state.y_count, 16, 1)}</div>
                <div id="enemy">{renderPixels(this.state.enemy_obj, 300, 200, 16, 1)}</div>
                <div id="enemy_health" style={{marginTop: 150 + 'px', marginLeft: 250 + 'px', position:'absolute', maxWidth: '100px', minWidth: '100px'}}>{renderHealthBar(this.state.enemy_health, 100)}</div>
                <div id="player_health" style={{marginTop: 150 + 'px', marginLeft: 50 + 'px', position:'absolute'}}>{renderHealthBar(this.state.player_health, 100)}</div>
                <div>{renderString("CATBORG", 25, 125)}</div>
                <div>{renderString("WATERMELON", 200, 125)}</div>
                <div>{renderString(this.state.turn_message, 25, 50)}</div>
                {/* <div>{renderString("SCRATCHs", 25, 300)}</div>
                <div>{renderString("HISS", 25, 350)}</div>
                <div>{renderString("LASER", 25, 400)}</div> */}
                <div>{this.renderPlayerActions()}</div>
                <input type="text" id="one" onKeyDown={this.handleKeyPress} style={{left, top, position:'absolute', maxWidth: 24 + 'px', maxHeight: 10 + 'px', outline: 'none', boxShadow: 'none', border: 'none', fontSize: 5 + 'px', color: 'pink'}}/>
            </div>
        );
    } 
    return(
        <div style={{ backgroundColor: "#1f1f1f"}} onKeyDown={this.handleKeyPress}>
            {/* <h1>office quest</h1> */}
            {/* <p>Your goal: conquer this harrowing sea of cubicles</p> */}
            {/* <div id="game_board" style={{backgroundColor: 'grey', padding: 150 + 'px', position:'absolute'}}/> */}
            {/* <h1 style={{marginTop: 350 + 'px', fontFamily: 'sans-serif'}}>Your controller is the field below (press wasd):</h1> */}
            {/* <input type="text" id="one" onKeyDown={this.handleKeyPress} style={{marginTop: 400 + 'px', marginLeft: 200 + 'px'}}/> */}
            <div>{renderPixels(this.state.board, 50, 50, this.state.num_board_rows, 5)}</div>
            <div id="player">{renderPixels(this.state.player_obj, this.state.x_count, this.state.y_count, 16, 1)}</div>
            <div id="enemy">{renderPixels(this.state.enemy_obj, 300, 300, 16, 1)}</div>
            <input type="text" id="one" onKeyDown={this.handleKeyPress} style={{left, top, position:'absolute', maxWidth: 24 + 'px', maxHeight: 10 + 'px', outline: 'none', boxShadow: 'none', border: 'none', fontSize: 5 + 'px', color: 'pink'}}/>
            {/* <div></div> id="player" style={{padding, left, top,position:'absolute',backgroundColor: 'blue'}}/> */}
        </div>
    );
  }
}