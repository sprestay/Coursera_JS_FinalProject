import React from 'react';
import Card from './Card';
import Modal from './Modal';
import Timer from './Timer';
import { connect } from 'react-redux';
import { clearPrevious, clearErrors, clearPairs } from '../redux/actions';

var emojis = ['🐮', '🐮', '🐻', '🐻', '🐯', '🐯', 
                        '🐶', '🐶', '🐱', '🐱', '🦁', '🦁'];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

emojis = shuffle(emojis);

const mapStateToProps = state => {
    return {
        pairs: state.pairs,
    }
};

const mapDispatchToProps = dispatch => ({
    clearErrors: () => dispatch(clearErrors()),
    clearPairs: () => dispatch(clearPairs()),
    clearPrevious: () => dispatch(clearPrevious()),
})

class Map extends React.Component {
    constructor(props) {
        super(props);
    
    this.state = {
        result: null,
        button: null,
        start: false,
    }
    this.modal = false;
}

    shouldComponentUpdate(nextProps, nextState) {
        let n = nextProps.pairs;
        if ((n.pairs.length === 12) || (n.pairs.length === 0 && n.previous.length === 0 
            && n.errors.length === 0) || (this.modal === true) || (this.state.start !== nextState.start))
            return true;

        return false;
    }
    again(flag) {
        if (flag) {
            this.modal = false;
            this.setState({start: true})
            this.props.clearErrors();
            this.props.clearPairs();
            this.props.clearPrevious();
            emojis = shuffle(emojis);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.start === false && nextProps.pairs.previous.length !== 0) {
            this.setState({start: true});
        }
    }

    after_timer(flag) {
        this.modal = true;
        this.setState({start: false});
        if (flag === 'Lose') {
            this.setState({result: 'Lose',
                            button: 'Try again'});
        } else if (flag === 'Win')
            this.setState({result: 'Win',
                            button: 'Play again'});
    }

    render() {
        const cards = emojis.map((item, index) => {
            return (<Card id={index}
                        name={item} />);
        })
        return (
            <div>
                <div className='map' id='map'>
                    {cards}
                </div>
                {this.modal ? <Modal result={this.state.result} 
                                                                button={this.state.button} 
                                                                for_return={this.again.bind(this)} /> : <div></div>}
                <Timer for_return={this.after_timer.bind(this)} start={this.state.start}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
//mapStateToProps
//mapDispatchToProps