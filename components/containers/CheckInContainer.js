import React, {Component} from 'react';
import Advocates from '../Advocates';
import FilterInput from '../FilterInput';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import AdvocateHover from '../AdvocateHover';

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
        const yesListArray = (this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'yes')).map(advocate => advocate.firstName + " " + advocate.lastName)
        const noListArray = (this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'no')).map(advocate => advocate.firstName + " " + advocate.lastName)
        const cancelledListArray = (this.props.advocates.allAdvocates.filter(advocate => advocate.checkedIn === 'cancelled')).map(advocate => advocate.firstName + " " + advocate.lastName)

        return (
            <div className='CheckInContainer center'>
                <h2 className="center">Check In</h2>
                <h3>
                    <span className="extraPadding" data-for='yesList' data-tip> Yes: {totalYes} </span>
                    <ReactTooltip id='yesList' place="bottom">
                        <AdvocateHover advocates={yesListArray}/>
                    </ReactTooltip>
                    <span className="extraPadding" data-for='noList' data-tip> No: {totalNo} </span>
                    <ReactTooltip id='noList' place="bottom">
                        <AdvocateHover advocates={noListArray}/>
                    </ReactTooltip>
                    <span className="extraPadding" data-for='cancelledList' data-tip> Cancelled: {totalCancelled} </span>
                    <ReactTooltip id='cancelledList' place="bottom">
                        <AdvocateHover advocates={cancelledListArray}/>
                    </ReactTooltip>
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
