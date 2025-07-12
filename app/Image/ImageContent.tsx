import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

interface ImageContextType {
    currentImage: ImageSourcePropType;
    setCurrentImage: (image: ImageSourcePropType) => void;
    getImage: (image: ImageSourcePropType) => ImageSourcePropType;
}

export const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{children: ReactNode}> = ({ children}) => {
    const [currentImage, setCurrentImage] = useState<ImageSourcePropType>(require('@/assets/images/react-logo.png'));
    const [error, setError] = useState<string | null>(null);

    const getImage = (image: ImageSourcePropType) => {
        return image;
    };

    return (
        <ImageContext.Provider value = {{
            currentImage: currentImage,
            setCurrentImage: setCurrentImage,
            getImage
        }}>
            {error ? (
                <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'red' }}>{error}</span>
                </div>
            ): (
                children
            )}
        </ImageContext.Provider>
    );
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if(!context) {
        throw new Error('useImage must be used within a ImageProvider');
    }
    return context;
}
 
export default ImageProvider;