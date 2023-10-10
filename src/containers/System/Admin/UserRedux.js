import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServices } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions";

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr : [],
            positionArr : [],
            roleArr : []
        }
    }

    async componentDidMount() {

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.fetchGenderStart());
        // try{
            
        //     let res = await getAllCodeServices('gender');
        //     if(res && res.errCode ===0){
        //         this.setState({
        //             genderArr : res.data
        //         })
        //     }
        //     console.log(' Check res :', res)

        // }catch(e){

        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux != this.props.genderRedux){
            this.setState({
                genderArr : this.props.genderRedux
            })
        }

        if(prevProps.roleReudx != this.props.roleReudx){
            this.setState({
                roleArr : this.props.roleReudx
            })
        }

        if(prevProps.positionRedux != this.props.positionRedux){
            this.setState({
                positionArr : this.props.positionRedux
            })
        }
    }

    render() {
        console.log('Check state ', this.state);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetRenders = this.props.isLoadingGender;
        console.log('Check positions : ', positions);
        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"> <FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12">{isGetRenders === true ? 'Loading genders ' : ''}</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 && genders.map((item,index)=>{
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                    
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.postition" /></label>
                                <select className="form-control">
                                    {positions && positions.length > 0 && positions.map((item,index)=>{
                                        return(
                                            <option key={index} >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    <option selected>
                                        Choose...
                                    </option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        genderRedux : state.admin.gender,
        isLoadingGender: state.admin.isLoadingGender,
        roleReudx : state.admin.roles,
        positionRedux : state.admin.positions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: ()=> dispatch(actions.fetchGenderStart()),
        getPositionStart: ()=> dispatch(actions.fetchPositionStart),
        getRoleStart: ()=> dispatch(actions.fetchRoleStart)
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
