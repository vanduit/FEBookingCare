import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props){ 
        super(props);
        this.state = {
            genderArr : [],
            positionArr : [],
            roleArr : [],
            previewImgUrl: '',
            isOpen : false,
            email: '',
            password: '',
            firstName : '',
            lastName : '',
            phoneNumber: '',
            address: '',
            position: '',
            role : '',
            avartar : '',
            action: '',
            userEditID: ''
        }
    }

    async componentDidMount() {

        // truyền redux sang react từ connect thư viện react-redux

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        // bắt component re-render lại

        if(prevProps.genderRedux != this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr : arrGenders,
                gender : arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if(prevProps.roleReudx != this.props.roleReudx){
            let arrRoles = this.props.roleReudx;
            
            this.setState({
                roleArr : arrRoles,
                role : arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrayPositions = this.props.positionRedux
            this.setState({
                positionArr : arrayPositions,
                position : arrayPositions && arrayPositions.length > 0 ? arrayPositions[0].key : ''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers){

            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleReudx;
            let arrayPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName : '',
                lastName : '',
                phoneNumber: '',
                address: '',
                gender : arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                role : arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                position : arrayPositions && arrayPositions.length > 0 ? arrayPositions[0].key : '',
                avartar : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImage = (event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl
            })
        }
        
        //console.log('Check file 0: ', objectUrl);
    }

    openPreViewImage = ()=>{
        if(!this.state.previewImgUrl) return;
        this.setState({
            isOpen : true
        })
    }

    handleSaveUser = ()=>{
        let isValid =  this.checkValidateInput();
        if(isValid === false) return;
        let {action} = this.state;
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditID,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                // avatar: this.state.avatar
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for(let i = 0 ; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required: ' +arrCheck[i])
                break;
            }
        }

        return isValid;

    }

    onChangeInput = (event, id)=>{

        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, ()=>{
            console.log('check input onchange ', this.state);
        })
    }

    handleEditUserFromParent = (user)=>{
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName : user.firstName,
            lastName : user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender : user.gender,
            role : user.roleId,
            position : user.positionId,
            avartar : '',
            action: CRUD_ACTIONS.EDIT,
            userEditID: user.id
        })
    }

    render() {
        console.log('Check state ', this.state);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetRenders = this.props.isLoadingGender;
        console.log('Check positions : ', positions);

        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state

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
                                <input className="form-control" type="email"  
                                value={email}
                                onChange={(event)=>(this.onChangeInput(event,'email'))}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password" 
                                value={password}
                                onChange={(event)=>(this.onChangeInput(event,'password'))}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className="form-control" type="text" 
                                value={firstName}
                                onChange={(event)=>(this.onChangeInput(event,'firstName'))}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className="form-control" type="text" 
                                value={lastName}
                                onChange={(event)=>(this.onChangeInput(event,'lastName'))}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className="form-control" type="text" 
                                value={phoneNumber}
                                onChange={(event)=>(this.onChangeInput(event,'phoneNumber'))}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" 
                                value={address}
                                onChange={(event)=>(this.onChangeInput(event,'address'))}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                onChange={(event)=>(this.onChangeInput(event,'gender'))}
                                value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item,index)=>{
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                    
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.postition" /></label>
                                <select className="form-control"
                                onChange={(event)=>(this.onChangeInput(event,'postition'))}
                                value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                onChange={(event)=>(this.onChangeInput(event,'role'))}
                                value={role}
                                >
                                    {roles && roles.length > 0 && roles.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden 
                                        onChange={(event)=>this.handleOnChangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage : `url(${this.state.previewImgUrl})` }}
                                        onClick={()=>this.openPreViewImage()}
                                    >
                                        
                                    </div>
                                </div>  
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning":"btn btn-primary"}
                                onClick={()=>this.handleSaveUser()}
                                >
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id="manage-user.edit" />
                                :
                                <FormattedMessage id="manage-user.save" />
                                }
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser 
                                handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                action = {this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                <Lightbox
                    mainSrc={this.state.previewImgUrl}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
                }
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
        positionRedux : state.admin.positions,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // kết nối giữa react và redux
        getGenderStart: ()=> dispatch(actions.fetchGenderStart()),
        getPositionStart: ()=> dispatch(actions.fetchPositionStart()),
        getRoleStart: ()=> dispatch(actions.fetchRoleStart()),
        createNewUser : (data)=>dispatch(actions.createNewUser(data)),
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart()),
        editUserRedux:(data)=> dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
