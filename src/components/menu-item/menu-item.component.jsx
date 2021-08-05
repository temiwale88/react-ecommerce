import React from 'react';
import {withRouter} from 'react-router-dom';
import './menu-item.styles.scss'

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    // match is a part of the props object that is associated with components you're rendering see lecture on 'React Router Dom' (lecture 78). Since we're passing MenuItem into (child componenent of) the Directory which in turn is the child of the HomePage and we're at the HomePage (path = '/') when we're viewing the Menu Items, then the match.url == '/' (i.e. your landing / home page) and that is appended to linkUrl which is passed dynamically to each MenuItem based on the state found in the Directory e.g. shop/hats. Thus our onClick takes us to /shops/hats homepage/menuitem.

    <div className={`${size} menu-item`} onClick={()=>history.push(`${match.url}${linkUrl}`)}>
        <div className="background-image" style= {{
        backgroundImage: `url(${imageUrl})`
    }} />
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>

)

export default withRouter(MenuItem);