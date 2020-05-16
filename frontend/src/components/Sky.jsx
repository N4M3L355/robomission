import React, {useEffect} from "react";
import meteoroid from "../images/meteoroid.svg";
import asteroid from "../images/asteroid.svg";
import rocketWithFlame from "../images/RocketWithFlame.svg";

export default function Sky() {
    let svg =(
        <svg width="100vw" height="100vh" id="sky" style={{
            position: "absolute",
            top: 0,
            left: 0
        }}>
        </svg>)

    useEffect(() => {

        const svgns = "http://www.w3.org/2000/svg";
        const container = document.getElementById( 'sky' );
        for(let i = 0;i<120;i++){
            let radius=Math.random();
            let distance = 3*(1-radius)+1;
            let circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cy', Math.random()*200-100+"%");
            circle.setAttributeNS(null, 'r', radius*10);
            circle.setAttributeNS(null, 'style', `
    fill: white; 
    stroke: none; 
    stroke-width: 1px; 
    animation-name: abc; 
    animation-duration:${distance*64}s; 
    animation-delay:${-distance*64*Math.random()}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    ` );
            container.appendChild(circle);
        }
        for(let i = 0;i<5;i++){
            let radius=Math.random();
            let distance = 1/(radius)+1;
            let stone = document.createElementNS(svgns, 'image');
            stone.setAttributeNS(null,'href', Math.random()>1/2?meteoroid:asteroid);
            stone.setAttributeNS(null, 'y', Math.random()*200-100+"%");
            stone.setAttributeNS(null,'width', radius*200+"px");
            stone.setAttributeNS(null, 'style', `
        animation-name: abc; 
        animation-duration:${1/distance*32}s; 
        animation-delay:${-1/distance*32*Math.random()}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        ` );
            container.appendChild(stone);
        }
        const rocketContainer = document.getElementById( 'rocket' );
        let rocket = document.createElementNS(svgns, 'image');
        rocket.setAttributeNS(null,'href', rocketWithFlame);
        rocket.setAttributeNS(null,'x', "55%");
        rocket.setAttributeNS(null,'y', "35%");
        rocket.setAttributeNS(null,"width","25%");
        rocketContainer&&rocketContainer.appendChild(rocket);
        container.appendChild(rocket);


    })
    return <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
        {svg}
    </div>

}
