import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkInAdvocate} from '../../actions/advocates';
import SenBuds from '../SenBuds';
import RepBuds from '../RepBuds';

class Advocate extends Component {
    constructor(props) {
        super(props);

        this.checkInAdvocate = this.checkInAdvocate.bind(this);
    }

    checkInAdvocate(evt) {
        const checkInStatus = evt.target.value;
        this.props.checkInAdvocate([this.props.advocate.id, checkInStatus])
    }

    render() {
        return (
            <div className='center'>
                <h1>{this.props.advocate.fullName}</h1>
                <label className="padding">Checked In? </label>
                <select type="select" value={this.props.advocate.checkedIn} onChange={this.checkInAdvocate}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <p><b>Advocate Notes: </b> {this.props.advocate.notesAttendee}</p>
                {/*<p>{this.props.advocate.city}</p>*/}
                <br/>
                <h3>Representative {this.props.advocate.representative}</h3>
                {/*<h4>House District {this.props.advocate.houseDist}</h4>*/}
                <p><b>Representative Notes: </b>{this.props.advocate.repNotes}</p>
                <RepBuds representative={this.props.advocate.representative} advocates={this.props.advocates} currentAdvocate = {this.props.advocate}></RepBuds>
                <br/>
                <h3>Senator {this.props.advocate.senator}</h3>
                {/*<h4>Senate District {this.props.advocate.senDist}</h4>*/}
                <p><b>Senator Notes: </b>{this.props.advocate.senNotes}</p>

                <SenBuds senator={this.props.advocate.senator} advocates={this.props.advocates} currentAdvocate = {this.props.advocate}></SenBuds>

                {/*<p>Email: {this.props.advocate.email}</p>*/}
                {/*<p>Congressional District {this.props.advocate.congDist}</p>*/}
                {/*<p>Senate District {this.props.advocate.sendDist}</p>*/}
                {/*<p>House District {this.props.advocate.houseDist}</p>*/}
                {/*<p>Address Line 1 {this.props.advocate.street1}</p>*/}
                {/*<p>Address Line 2 {this.props.advocate.street2}</p>*/}
                {/*<p>Zip Code {this.props.advocate.zip}</p>*/}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        advocates: state.advocates,
        advocate: state.advocates.currentAdvocate
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkInAdvocate: function ([advocateId, checkInStatus]) {
            dispatch(checkInAdvocate([advocateId, checkInStatus]));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Advocate);
