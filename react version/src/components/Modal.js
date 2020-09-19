import React from 'react';


class Modal extends React.Component {
    render() {
        return (
            <div>
            <div className='modal' id='modal'>
                <div className='message_block'>
                    <p className='message' id='result_msg'>{this.props.result}</p>
                    <button id='button' onClick={() => {this.props.for_return(true)}}>{this.props.button}</button>
                </div>
            </div>
            </div>
        )
    }
}

export default Modal;