import React, {useEffect} from "react";
import meteoroid from "../images/meteoroid.svg";
import asteroid from "../images/asteroid.svg";

export default function Sky() {

    let styleSheet = document.styleSheets[0];

    let animationName = `animation${Math.round(Math.random() * 2**16)}`;
    animationName = "abc";
    let keyframes =
        `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform:translate(-5%, -5%)} 
        100% {-webkit-transform:translate(105%, 55%)}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    keyframes =
        `@-webkit-keyframes rocketAnimation {
        0% {-webkit-transform: translate(0px, 0px)} 
        50% {-webkit-transform: translate(-50px, 50px)}
        100% {-webkit-transform: translate(0px, 0px)}
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    keyframes =
        `@-webkit-keyframes diamondAnimation {
        0% {-webkit-transform:translate(-5%, -5%)} 
        100% {-webkit-transform:translate(105%, 55%)}
    }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);


    let svg =(
        <svg id="sky" style={{
            position: "relative",/*
            top: 0,
            left: 0,*/
            width: "100%",
            height: "100%",
            display: "flex",
            flex: 1
        }}>
            <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
        </svg>)

    useEffect(() => {

        const svgns = "http://www.w3.org/2000/svg";
        const container = document.getElementById( 'sky' );
        for(let i = 0;i<document.getElementById( 'sky' ).getBoundingClientRect().width/12;i++){         //the wider the container, the more stars we want... maybe HiDPI displays will go bonkers,
            let radius=12;
            let distance = 2+1/Math.random();
            let circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cy', Math.random()*200-100+"%");
            circle.setAttributeNS(null, 'r', Math.ceil(radius/distance));
            circle.setAttributeNS(null, 'filter', "url(#blur3)");
            circle.setAttributeNS(null, 'style', `
                fill: white; 
                stroke: none; 
                stroke-width: 1px; 
                animation-name: abc; 
                animation-duration:${Math.round(distance*2**7)}s; 
                animation-delay:${Math.round(-distance*2**7*Math.random())}s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            ` );
            container.appendChild(circle);
        }
        for(let i = 0;i<6;i++){
            let radius=Math.random();
            let distance = 1/(radius)+1;
            let stone = document.createElementNS(svgns, 'image');
            stone.setAttributeNS(null,'href', Math.random()>1/2?meteoroid:asteroid);
            stone.setAttributeNS(null, 'y', Math.random()*200-100+"%");
            stone.setAttributeNS(null,'width', radius*200+"px");
            stone.setAttributeNS(null, 'style', `
                animation-name: abc; 
                animation-duration:${1/distance*64}s; 
                animation-delay:${-1/distance*64*Math.random()}s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            ` );
            container.appendChild(stone);
        }


    },[])
    return svg

}
