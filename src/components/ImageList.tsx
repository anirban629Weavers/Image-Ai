import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { IImageData } from '../@types';
import ImageItem from './ImageItem';
import { DummyImagesData } from '../data';

export default function ImageContainer({ img }: { img?: IImageData }) {
    const [counter, setCounter] = React.useState<number>(0)
    const [itemData, setItemData] = React.useState<Array<IImageData>>([])
    console.log(img);

    return (
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
            {itemData.length > 0
                ? <ImageList variant="masonry" cols={3} gap={8}>
                    {itemData.map((item, index) => <ImageItem index={index} item={item} />)}
                </ImageList>
                : <h1>Enter text to generate Image</h1>
            }
            {counter < DummyImagesData.length ?
                <button onClick={() => {
                    setItemData(itemData => [...itemData, DummyImagesData[counter]])
                    // itemData.push(DummyImagesData[counter])
                    setCounter(counter + 1)
                }}>add image</button> : <h1>No More Images to show</h1>

            }
        </Box>
    );
}

