import React, { Component, useState, useEffect, useRef, Fragment } from 'react';
import { images } from "../utils/Image";
import { Grid, Image, Checkbox, Button } from 'semantic-ui-react'
import CardBackground from '../assets/img/gray_back.png'
import "./Game.css"
const Game = () => {

    const [newImages, setNewImages] = useState([])
    const [pair, setPair] = useState(false)
    const curRef = useRef(null);
    const preRef = useRef(null)

    useEffect(() => {
        shuffleCard()
    }, [])

    const shuffleCard = () => {
        const imageArr = [];
        let remainImage = [...images]
        for (let i = 0; i < 4; i++) {
            const rand = remainImage[Math.floor(Math.random() * (remainImage.length - 1))];
            remainImage = remainImage.filter((image) => image.name !== rand.name)
            imageArr.push({ ...rand })
            imageArr.push({ ...rand })
        }
        imageArr.sort(() => Math.random() - 0.5)
        setNewImages(imageArr)
    }

    useEffect(() => {
        console.log('hello')
        check(curRef.current, preRef.current)
        setPair(false)
    }, [pair])

    const flip = (index) => {
        const images = [...newImages]

        if (images[index].checked) {
            return
        }


        if (!curRef) {
            curRef.current = index
        } else {
            preRef.current = curRef.current
            curRef.current = index
        }
        images[index].flipped = true
        setNewImages(images)
        setTimeout(() => {
            setPair(true)
        }, 500)

    }


    const check = (cur, pre) => {
        if (cur === null || pre === null) {
            return
        }

        if (pre === cur) {
            return
        }

        console.log(cur)
        console.log(pre)
        const images = [...newImages]
        if (images[cur].name === images[pre].name) {
            images[cur].checked = true
            images[pre].checked = true
            curRef.current = null
            preRef.current = null
        } else {
            images[cur].flipped = false
            images[pre].flipped = false
            curRef.current = null
            preRef.current = null
        }
        setNewImages(images)

    }

    const reset = () => {
        shuffleCard()
    }

    return (
        <>
            <Button className="reset-btn" onClick={reset}>RESET</Button>
            <Grid columns={4}>
                {newImages
                    .map((element, index) => {
                        return (
                            <Grid.Column key={`element.name-${index}`} onClick={() => flip(index)}>
                                {
                                    element.flipped
                                        ?
                                        <Image src={element.pic} />
                                        :
                                        <Image src={CardBackground} />
                                }
                            </Grid.Column>


                        );
                    })}
            </Grid>
        </>

    )

}

export default Game