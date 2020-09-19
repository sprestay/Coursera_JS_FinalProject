import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        pairs: state.pairs,
    }
};

class Timer extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        time: null,
    }
    this.timerID = null;
}
    counter () {
        if (this.state.time){
            var current = this.state.time - 1;
            this.setState({time: current});
            if (current === 0 || this.props.pairs.pairs.length === 12) {
                clearInterval(this.timerID);
                if (current !== 0)
                    this.props.for_return('Win');
                else
                    this.props.for_return('Lose');
            }

    }
}

    shouldComponentUpdate(nextProps) {
        if ((this.props.start === true) || (this.props.start === false && nextProps.start === true))
            return true
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.start === false && nextProps.start === true) {
            this.setState({time: 59});
            this.timerID = setInterval(this.counter.bind(this), 1000)
        }
    }

    time_displayer(time) {
        if (time < 10)
            return "0" + time
        else
            return time
    }

    render() {
        return (<div className='timer' id='timer'>{this.state.time !== null ? "00:" + this.time_displayer(this.state.time) : "01:00"}</div>)
    }
}


export default connect(mapStateToProps, null)(Timer);