import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title}) => {
    var defaultTitle = 'Today I learned';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    )
}

export default TitleComponent