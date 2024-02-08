import { ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'
import { IImageData } from '../@types'

const ImageItem = ({ item, index }: { item: IImageData, index: number }) => {
    return (
        <ImageListItem key={index}>
            <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={String(item.title)}
                loading="lazy"
            />
            <ImageListItemBar position="below" title={item.author} />
        </ImageListItem>)
}

export default ImageItem