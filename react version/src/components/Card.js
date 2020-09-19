import React from 'react';
import { connect } from 'react-redux';
import { addPair, addItem, addError, clearPrevious, clearErrors } from '../redux/actions';
var classNames = require('classnames');

const mapStateToProps = state => {
    return {
        pairs: state.pairs,
    }
};

const mapDispatchToProps = dispatch => ({
    addPair: (card_id) => dispatch(addPair(card_id)),
    addItem: (card_id, name) => dispatch(addItem([card_id, name])),
    addError: (card_id) => dispatch(addError(card_id)),
    clearPrevious: () => dispatch(clearPrevious()),
    clearErrors: () => dispatch(clearErrors()),

})

class Card extends React.Component {

    change_side() {
        let id = this.props.id;
        let p = this.props.pairs;
        if (!(p.pairs.includes(id) || p.previous.includes(id) || p.errors.includes(id))) { // если карточки нигде нет - переворачиваем
            if (p.previous.length !== 0){
                if (p.previous[1] === this.props.name)
                    this.props.addPair([p.previous[0], id]);
                else
                    this.props.addError([p.previous[0], id]);
                this.props.clearPrevious(); 
            } else {
                if (p.errors.length !== 0)
                    this.props.clearErrors();
                this.props.addItem(id, this.props.name);
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        let p = this.props.pairs;
        let id = this.props.id;
        let n = nextProps.pairs;
        if (p.pairs.includes(id) !== n.pairs.includes(id) || p.previous.includes(id) !== n.previous.includes(id) || 
            p.errors.includes(id) !== n.errors.includes(id))
            return true;
        else
            return false;
    }

    render() {
        let p = this.props.pairs;

        var front = "";
        if ((p.pairs.includes(this.props.id) || p.previous.includes(this.props.id) || p.errors.includes(this.props.id)))
            front = 'rotateY(180deg)';
        else
            front = 'rotateY(0deg)';

        var cl = classNames({
            'back': true,
            'match': p.pairs.includes(this.props.id),
            'error': p.errors.includes(this.props.id),
        })
        return (
            <div className='card' id={this.props.id} onClick={this.change_side.bind(this)} style={{transform: front}}>
                <div className='front'></div>
                <div className={cl} ><p className='emoji'>{this.props.name}</p></div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
