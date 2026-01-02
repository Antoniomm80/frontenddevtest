import {DetailRow} from "./detailRow.jsx";

export const ProductDescription = ({product}) => {
    const {
        brand,
        model,
        price,
        cpu,
        ram,
        os,
        displayResolution,
        battery,
        primaryCamera,
        secondaryCmera,
        dimentions,
        weight
    } = product;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{brand} {model}</h2>
            <p className="text-3xl font-semibold text-blue-600 mb-6">{price} €</p>

            <div className="space-y-1">
                <DetailRow label="CPU" value={cpu}/>
                <DetailRow label="RAM" value={ram}/>
                <DetailRow label="Operating System" value={os}/>
                <DetailRow label="Screen Resolution" value={displayResolution}/>
                <DetailRow label="Battery" value={battery}/>
                <DetailRow label="Primary Camera" value={primaryCamera}/>
                <DetailRow label="Secondary Camera" value={secondaryCmera}/>
                <DetailRow label="Dimensions" value={dimentions}/>
                <DetailRow label="Weight" value={weight}/>
            </div>
        </div>
    );
};
