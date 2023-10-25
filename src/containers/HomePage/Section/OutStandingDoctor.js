import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";

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
        allDoctors = allDoctors.concat(allDoctors).concat(allDoctors);
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allDoctors && allDoctors.length>0 && allDoctors.map((item,index)=>{
                                return(
                                    <div className="section-customize" key={index}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-outstandingdoctor" />
                                            </div>
                                            <div className="position text-center">
                                                <div >Giáo sư - Tiến sĩ, BS Nguyễn Văn A</div>
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
