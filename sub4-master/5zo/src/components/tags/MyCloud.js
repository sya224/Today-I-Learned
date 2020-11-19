import React from "react";
import { TagCloud } from 'react-tagcloud'

import 'd3-transition';
import { select } from 'd3-selection';

import ReactWordcloud from 'react-wordcloud';


import history from '../../history'

function getCallback(callback) {
    return function (word, event) {
        const isActive = callback !== 'onWordMouseOut';
        const element = event.target;
        const text = select(element);
        text
            .on('click', () => {
                if (isActive) {
                    history.push(`/search/${word.text}/type:tag`);
                }
            })
            .transition()
            .attr('background', 'white')
            .attr('font-size', isActive ? '300%' : '100%')
            .attr('text-decoration', isActive ? 'underline' : 'none');
    };
}

const callbacks = {
    getWordColor: word => (word.value > 50 ? 'orange' : 'purple'),
    getWordTooltip: word =>
        `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver'),
};


const SimpleCloud = ({ tags }) => {
    const words = []
    tags.map(tag => words.push({
        'text': tag.tag_name,
        'value': tag.tag_id
    }))

    const tagCloudTags = []
    tags.map(tag => tagCloudTags.push({
        'value': tag.tag_name,
        'count': tag.tag_id
    }))
    const handleClick = (tag) => {
        history(`/search/${tag.value}?type:tag`)
    }
    return (
        <>
            <TagCloud
                minSize={20}
                maxSize={60}
                tags={tagCloudTags}
                onClick={tag => handleClick(tag)}
            />
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud callbacks={callbacks} words={words} />
                {/* <ReactWordcloud callbacks={callbacks} words={words_} /> */}
            </div>
        </>
    )
}

export default SimpleCloud