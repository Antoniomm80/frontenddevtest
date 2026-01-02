export const ProductImage = ({imgUrl, brand, model}) => {
    return (
        <div>
            <img
                src={imgUrl}
                alt={`${brand} ${model}`}
                className="w-full h-auto object-contain rounded"
            />
        </div>
    );
};
