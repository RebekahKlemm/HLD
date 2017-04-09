import React, {Component} from 'react';
import Senators from '../Senators';
import Representatives from '../Representatives';
import {connect} from 'react-redux';

class CoverageContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const allAdvocates = this.props.allAdvocates;

        let senators = [];
        let representatives = [];

        for(let i = 0; i < allAdvocates.length; i++){

               if(senators.indexOf(allAdvocates[i].senator) === -1) {
                   senators.push(allAdvocates[i].senator);
               }

               if(representatives.indexOf(allAdvocates[i].representative) === -1){
                   representatives.push(allAdvocates[i].representative);
               }
        }

        for(let j= 0; j< allAdvocates.length; j++){
            //if the advocate is a 'yes'
            if(allAdvocates[j].checkedIn === 'yes'){
                if(senators.indexOf(allAdvocates[j].senator) !== -1) {
                    senators.splice(senators.indexOf(allAdvocates[j].senator), 1)
                }

                if(representatives.indexOf(allAdvocates[j].representative) !== -1){
                    representatives.splice(representatives.indexOf(allAdvocates[j].representative), 1)

                }
            }
        }

        return (

            <div className='CheckInContainer center'>
                <h2 className="center">Senators</h2>
                <Senators className="center" senators={senators}/>
                <h2 className="center">Representatives</h2>
                <Representatives className="center" representatives={representatives}/>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        allAdvocates: state.advocates.allAdvocates
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(CoverageContainer);
