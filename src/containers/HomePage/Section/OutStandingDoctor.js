import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import {LANGUAGES} from '../../../utils';

class OutStandingDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
            this.setState({
                arrDoctors : this.props.topDoctorRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctors();
    }

    render() {
        let allDoctors = this.state.arrDoctors;
        let {language} = this.props;
        allDoctors = allDoctors.concat(allDoctors).concat(allDoctors);
        console.log('check doctor :', allDoctors);
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allDoctors && allDoctors.length>0 && allDoctors.map((item,index)=>{
                                let imageBase64 = '';
                                if(item.image){
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                return(
                                    <div className="section-customize" key={index}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-outstandingdoctor" 
                                                style={{ backgroundImage : `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className="position text-center">
                                                <div >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div >Cơ xương khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: ()=>dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
