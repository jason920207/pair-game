import React, { Component, useState, useEffect, useRef, Fragment } from 'react';
import { images } from "../utils/Image";
import { Grid, Image, Checkbox, Button } from 'semantic-ui-react'
import CardBackground from '../assets/img/gray_back.png'
import "./Game.css"
import MyModal from './Modal'

const Game = ({ numberOfPairs }) => {

    const [newImages, setNewImages] = useState([])
    const [pair, setPair] = useState(false)
    const [checkedList, setCheckedList] = useState([])
    const curRef = useRef(null);
    const preRef = useRef(null)
    const checkedListRef = useRef()
    checkedListRef.current = checkedList

    const [open, setOpen] = useState(false)

    useEffect(() => {
        shuffleCard()
    }, [numberOfPairs])

    const shuffleCard = () => {
        const imageArr = [];
        let remainImage = [...images]
        for (let i = 0; i < numberOfPairs; i++) {
            const rand = remainImage[Math.floor(Math.random() * (remainImage.length - 1))];
            remainImage = remainImage.filter((image) => image.name !== rand.name)
            imageArr.push({ ...rand })
            imageArr.push({ ...rand })
        }
        imageArr.sort(() => Math.random() - 0.5)
        setNewImages(imageArr)
    }

    useEffect(() => {
        onCheck(curRef.current, preRef.current)
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


    const onCheck = (cur, pre) => {
        if (cur === null || pre === null) {
            return
        }

        if (pre === cur) {
            return
        }

        const images = [...newImages]
        if (images[cur].name === images[pre].name) {
            images[cur].checked = true
            images[pre].checked = true
            curRef.current = null
            preRef.current = null
            console.log(checkedListRef)
            checkedListRef.current.push(images[cur])
            checkedListRef.current.push(images[pre])

            if (checkedListRef.current.length === images.length) {
                setOpen(true)
            }
        } else {
            images[cur].flipped = false
            images[pre].flipped = false
            curRef.current = null
            preRef.current = null
        }
        setNewImages(images)

    }

    const onReset = () => {
        shuffleCard()
        setCheckedList([])
    }

    const onModalReset = () => {
        setOpen(false)
        shuffleCard()
        setCheckedList([])
    }

    const onModalClose = () => {
        setOpen(false)
        setCheckedList([])
    }


    return (
        <>
            <MyModal
                open={open}
                setOpen={setOpen}
                reset={onModalReset}
                onModalClose={onModalClose}
            />
            <Button className="reset-btn" onClick={onReset}>RESET</Button>
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