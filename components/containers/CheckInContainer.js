import React, {Component} from 'react';
import Advocates from '../Advocates';
import FilterInput from '../FilterInput';
import {connect} from 'react-redux';

class CheckInContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            inputValue: value
        });
    }

    render() {
        const inputValue = this.state.inputValue.toLowerCase();
        const filteredAdvocates = this.props.advocates.allAdvocates.filter(advocate =>
            advocate.lastName.toLowerCase().match(inputValue));
        console.log("here is filteredAdvocates", filteredAdvocates);
        return (
            <div className='CheckInContainer center'>
                <h2 className="center">Advocates</h2>
                <FilterInput
                    handleChange={this.handleChange}
                    inputValue={inputValue}
                />
                <Advocates className="center" advocates={filteredAdvocates}/>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        advocates: state.advocates
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckInContainer);
