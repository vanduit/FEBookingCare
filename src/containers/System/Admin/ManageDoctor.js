import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML:'',
            selectedDoctor: '',
            description: '',
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = ()=>{
        console.log('check state :', this.state);
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        console.log('Option selected',selectedDoctor);
    };

    handleOnChangeDesc = (event)=>{
        this.setState({
            description : event.target.value
        })
    }

    render() {
        return (
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        Tạo thêm thông tin doctors
                    </div>
                    <div className="more-infor">
                        <div className="content-left form-group">
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className="content-right">
                            <label>Thông tin giới thiệu:</label>
                            <textarea className="form-control" rows = "4"
                                onChange={(event)=>this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            >
                                dkadksdksakdadadksad
                            </textarea>
                        </div>
                    </div>
                    <div>
                        <MdEditor 
                            style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                        />
                    </div>
                    <button
                        onClick={()=>this.handleSaveContentMarkdown()} 
                        className="save-content-doctor">
                        Lưu thông tin
                    </button>
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listusers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id)=>dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
