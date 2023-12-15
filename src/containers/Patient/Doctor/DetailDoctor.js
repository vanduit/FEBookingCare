import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import {getDetailInforDoctor} from '../../../services/userService';

class DetailDoctor extends Component {

    constructor(props){
        super(props);
        this.state={

        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            console.log('check res :', res);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    render() {
        return (
            <>
                <HomeHeader
                    isShowBanner={false} 
                />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">

                        </div>
                        <div className="content-right">
                            <div className="up">
                                Phó giáo sư tiến sĩ     
                            </div>
                            <div className="down">
                                abababaababababbabababbabababbababa
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">

                    </div>
                    <div className="detail-infor-doctor">

                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
