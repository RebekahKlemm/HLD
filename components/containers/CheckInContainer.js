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
        const totalYes = this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'yes').length;
        const totalNo = this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'no').length;
        const totalCancelled = this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'cancelled').length;

        return (
            <div className='CheckInContainer center'>
                <h2 className="center">Check In</h2>
                <h3>
                    <span className="extraPadding"> Yes: {totalYes} </span>
                    <span className="extraPadding"> No: {totalNo} </span>
                    <span className="extraPadding"> Cancelled: {totalCancelled} </span>
                </h3>
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
