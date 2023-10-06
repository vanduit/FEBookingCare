import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Demo test width VanDuITDEV1994
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="60%" height="400" src="https://www.youtube.com/embed/GoDS0X7RTyI" title="Microservices là gì? Kiến trúc &quot;nhỏ&quot; cho các dự án siêu to - Code Dạo Dễ Òm" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
                    </div>
                    <div className="content-right">

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
